/**
 * Returns the current date in the correct format for ingestion by the Salesforce sObject API.
 *
 * @returns {string} the current date in yyyy-mm-dd format
 */

export const salesforceFormattedCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = String(today.getFullYear());

  return `${yyyy}-${mm}-${dd}`;
};
