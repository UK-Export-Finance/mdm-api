module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce JSDoc documentation on all regex constants',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      missingRegexDoc: 'All regex constants must have JSDoc documentation.',
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.sourceCode;

    /**
     * Check if a node is a RegExp constructor call (new or direct)
     */
    function isRegExpConstructor(node) {
      if (!node) {
        return false;
      }

      // new RegExp(...) or RegExp(...)
      if (node.callee && node.callee.type === 'Identifier' && node.callee.name === 'RegExp') {
        return node.type === 'NewExpression' || node.type === 'CallExpression';
      }

      return false;
    }

    /**
     * Get the declaration node for comment retrieval
     */
    function getCommentParent(varNode) {
      const varDeclaration = varNode.parent;

      if (!varDeclaration || varDeclaration.type !== 'VariableDeclaration') {
        return null;
      }

      const exportNode = varDeclaration.parent;

      return exportNode?.type === 'ExportNamedDeclaration' || exportNode?.type === 'ExportDefaultDeclaration' ? exportNode : varDeclaration;
    }

    /**
     * Check if a JSDoc comment is immediately preceding the target node
     */
    function getImmediatelyPrecedingJsDoc(targetNode) {
      const comments = sourceCode.getCommentsBefore(targetNode);

      if (comments.length === 0) {
        return null;
      }

      // Get the last (most recent) comment before the target node
      const lastComment = comments[comments.length - 1];

      // Check if it's a JSDoc block comment
      if (lastComment.type !== 'Block' || !lastComment.value.startsWith('*')) {
        return null;
      }

      // Verify the comment is immediately adjacent (no tokens between comment and declaration)
      // by checking if any other tokens exist between the comment and the target node
      const tokensAfterComment = sourceCode.getTokensAfter(lastComment, {
        includeComments: false,
        count: 1,
      });

      if (tokensAfterComment.length > 0 && tokensAfterComment[0].range[0] === targetNode.range[0]) {
        return lastComment;
      }

      return null;
    }

    /**
     * Check if node has JSDoc comment immediately preceding it
     */
    function hasJsDoc(commentParent) {
      return getImmediatelyPrecedingJsDoc(commentParent) !== null;
    }

    /**
     * Check if a property has JSDoc comment immediately preceding it
     */
    function hasPropertyJsDoc(propertyNode) {
      return getImmediatelyPrecedingJsDoc(propertyNode) !== null;
    }

    /**
     * Find the top-level variable declaration or property node that owns a regex node
     */
    function findOwningDeclaration(node) {
      let current = node;

      while (current) {
        const parent = current.parent;

        // Stop at VariableDeclarator
        if (parent && parent.type === 'VariableDeclarator') {
          return parent;
        }

        // Stop at Property
        if (parent && parent.type === 'Property') {
          return parent;
        }

        // Stop at ExportNamedDeclaration or ExportDefaultDeclaration
        if (parent && (parent.type === 'ExportNamedDeclaration' || parent.type === 'ExportDefaultDeclaration')) {
          return parent;
        }

        // Skip through ArrayExpression, ArrowFunctionExpression body, and BlockStatement
        if (
          parent &&
          (parent.type === 'ArrayExpression' ||
            (parent.type === 'ArrowFunctionExpression' && parent.body) ||
            parent.type === 'BlockStatement' ||
            parent.type === 'ReturnStatement')
        ) {
          current = parent;
        } else {
          break;
        }
      }

      return null;
    }

    /**
     * Check if a regex node (literal or constructor) has documentation
     */
    function reportUndocumentedRegex(node) {
      const owningDecl = findOwningDeclaration(node);

      if (!owningDecl) {
        return;
      }

      // For VariableDeclarator, check the comment parent
      if (owningDecl.type === 'VariableDeclarator') {
        const commentParent = getCommentParent(owningDecl);

        if (!commentParent || !hasJsDoc(commentParent)) {
          context.report({
            node,
            messageId: 'missingRegexDoc',
          });
        }

        return;
      }

      // For Property, check directly
      if (owningDecl.type === 'Property') {
        if (!hasPropertyJsDoc(owningDecl)) {
          context.report({
            node,
            messageId: 'missingRegexDoc',
          });
        }
      }
    }

    return {
      Literal(node) {
        // Check for regex literals: /pattern/
        if (node.regex) {
          reportUndocumentedRegex(node);
        }
      },

      CallExpression(node) {
        // Check for RegExp(...) constructor calls
        if (isRegExpConstructor(node)) {
          reportUndocumentedRegex(node);
        }
      },

      NewExpression(node) {
        // Check for new RegExp(...) constructor calls
        if (isRegExpConstructor(node)) {
          reportUndocumentedRegex(node);
        }
      },
    };
  },
};
