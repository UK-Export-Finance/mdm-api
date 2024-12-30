# Changelog

## [1.22.2](https://github.com/UK-Export-Finance/mdm-api/compare/v1.22.1...v1.22.2) (2024-12-30)


### Bug Fixes

* **deps:** replace all ([#1118](https://github.com/UK-Export-Finance/mdm-api/issues/1118)) ([b712981](https://github.com/UK-Export-Finance/mdm-api/commit/b71298111f9095905c9669a275b1f445e5794ee1))

## [1.22.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.22.0...v1.22.1) (2024-12-18)


### Bug Fixes

* **APIM-611:** notify, companies house bug fixes ([#1113](https://github.com/UK-Export-Finance/mdm-api/issues/1113)) ([2c5b84a](https://github.com/UK-Export-Finance/mdm-api/commit/2c5b84a4f459f60e12b6ce981de037479b1c2074))

## [1.22.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.6...v1.22.0) (2024-12-17)


### Features

* **APIM-608:** gov notify - file upload/link support ([#1083](https://github.com/UK-Export-Finance/mdm-api/issues/1083)) ([dddf3e6](https://github.com/UK-Export-Finance/mdm-api/commit/dddf3e6b109163852b9a69d6761346f45e7ce922))
* **APIM-609:** companies house - extend returned fields ([#1089](https://github.com/UK-Export-Finance/mdm-api/issues/1089)) ([041124c](https://github.com/UK-Export-Finance/mdm-api/commit/041124cf54874c9c40896b64573ee6e9d4a1c633))
* **APIM-610:** markets - add country rating description field ([#1090](https://github.com/UK-Export-Finance/mdm-api/issues/1090)) ([11ec0d4](https://github.com/UK-Export-Finance/mdm-api/commit/11ec0d4012e0a6e8d2aefc3745dd463369fbd733))


### Bug Fixes

* **APIM-608:** eslint downgraded ([b0e349c](https://github.com/UK-Export-Finance/mdm-api/commit/b0e349cb96d2ef65a77826eee3b311e274cdbaa8))
* **APIM-608:** make GovNotify properties optional ([#1082](https://github.com/UK-Export-Finance/mdm-api/issues/1082)) ([9240907](https://github.com/UK-Export-Finance/mdm-api/commit/92409076d396244c8f1a7d107a795ab7f25c762d))

## [1.21.6](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.5...v1.21.6) (2024-11-04)


### Bug Fixes

* **deps:** update dependency date-fns to v4 ([#1051](https://github.com/UK-Export-Finance/mdm-api/issues/1051)) ([9ab56af](https://github.com/UK-Export-Finance/mdm-api/commit/9ab56af6ceb13e95b70529bb34bf11ccf87aa214))

## [1.21.5](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.4...v1.21.5) (2024-08-15)


### Bug Fixes

* **deps:** update all ([#974](https://github.com/UK-Export-Finance/mdm-api/issues/974)) ([cef143f](https://github.com/UK-Export-Finance/mdm-api/commit/cef143fba65b42bd4784bc3a4174ce830977a31a))

## [1.21.4](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.3...v1.21.4) (2024-07-31)


### Bug Fixes

* **company-house:** company house API response ([#967](https://github.com/UK-Export-Finance/mdm-api/issues/967)) ([c9234b8](https://github.com/UK-Export-Finance/mdm-api/commit/c9234b82e692baa4f792b07f1d74401660089d44))
* **deps:** update dependency mssql to v11 ([#954](https://github.com/UK-Export-Finance/mdm-api/issues/954)) ([8942563](https://github.com/UK-Export-Finance/mdm-api/commit/8942563921e7a7cec22a3c6b2dc70aceecc16fcb))

## [1.21.3](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.2...v1.21.3) (2024-06-12)


### Bug Fixes

* **DTFS2-7223:** ensure registration number regex only accepts 8-character strings ([#943](https://github.com/UK-Export-Finance/mdm-api/issues/943)) ([18ba1c5](https://github.com/UK-Export-Finance/mdm-api/commit/18ba1c5bbe3a94916e3a3a7e59921eeacdef61d8))

## [1.21.2](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.1...v1.21.2) (2024-06-12)


### Bug Fixes

* **DTFS2-7203:** fix bug where /companies returns 500 for companies w/o SIC codes ([#932](https://github.com/UK-Export-Finance/mdm-api/issues/932)) ([d397861](https://github.com/UK-Export-Finance/mdm-api/commit/d397861ca3b137528b1e9ef83401b4496aad5b0e))

## [1.21.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.21.0...v1.21.1) (2024-06-04)


### Bug Fixes

* **deployment:** added env variables to deployment ([#918](https://github.com/UK-Export-Finance/mdm-api/issues/918)) ([eaf7fad](https://github.com/UK-Export-Finance/mdm-api/commit/eaf7fad86d2b4f7e5f0158c4164f28b5d8c7b402))

## [1.21.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.20.0...v1.21.0) (2024-06-04)


### Features

* **DTFS-7049:** added POST /emails endpoint for sending emails using GOV.UK Notify service ([#820](https://github.com/UK-Export-Finance/mdm-api/issues/820)) ([3a1bf0e](https://github.com/UK-Export-Finance/mdm-api/commit/3a1bf0e369167f7aa1b7a940a4120260a419c3c0))
* **DTFS2-7049:** fixed tests caused by removal of global transformer and allowing extra params ([71e44ff](https://github.com/UK-Export-Finance/mdm-api/commit/71e44ff577b00695743ad62537b00d6fd25bb22d))
* **DTFS2-7049:** fixing PR issues ([e0e099e](https://github.com/UK-Export-Finance/mdm-api/commit/e0e099e841726c34cac121059bacff393bfceef7))
* **DTFS2-7049:** removed BadRequestException tests moving payload to object instead of array ([3bb8d71](https://github.com/UK-Export-Finance/mdm-api/commit/3bb8d714eace1fcaf9fe987b77c8641e1dc79686))
* **DTFS2-7049:** return error message as string instead of array ([86b5b4d](https://github.com/UK-Export-Finance/mdm-api/commit/86b5b4d982c16ba0e8b6964ff2d422e746800cc3))
* **DTFS2-7049:** test unknown Gov.UK Notify responses ([c14fa49](https://github.com/UK-Export-Finance/mdm-api/commit/c14fa49d6eabf09585dd85f58a6415fcca2aa9c5))
* **DTFS2-7121:** create Companies House endpoint ([#821](https://github.com/UK-Export-Finance/mdm-api/issues/821)) ([7860528](https://github.com/UK-Export-Finance/mdm-api/commit/786052823f37b9b5f8e832fc2678c1cfdfb87fed))


### Bug Fixes

* **eslint:** reverted back to eslint `8.57.0` ([#905](https://github.com/UK-Export-Finance/mdm-api/issues/905)) ([75ca97c](https://github.com/UK-Export-Finance/mdm-api/commit/75ca97c46e77b2737ff441246974122c346c133e))

## [1.20.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.19.0...v1.20.0) (2024-05-22)


### Features

* **ami:** migration to Azure AMI ([9854d57](https://github.com/UK-Export-Finance/mdm-api/commit/9854d573182ddedc6e521343d4b23b7b720754fd))
* **ami:** migration to Azure AMI ([#514](https://github.com/UK-Export-Finance/mdm-api/issues/514)) ([bfeaa1e](https://github.com/UK-Export-Finance/mdm-api/commit/bfeaa1e190b1872e346a5866a5df778a859f2f0f))
* **APIM-344:** added test to redact using regex in 'redactStringsInLogArgs' ([709477d](https://github.com/UK-Export-Finance/mdm-api/commit/709477d1ce6a8a8638be08522af57e3cf2cf94d1))
* **APIM-344:** fix 2 PR feedback items, change comment and var type ([da02c07](https://github.com/UK-Export-Finance/mdm-api/commit/da02c071096e7c1ba07bc90b9e1b06a77829357e))
* **APIM-344:** handle sensitive details in log messages ([#324](https://github.com/UK-Export-Finance/mdm-api/issues/324)) ([2e5a948](https://github.com/UK-Export-Finance/mdm-api/commit/2e5a948fccee916518bc5e2c07c267071966bf30))
* **APIM-344:** use process variable to enable/disable redacting at bootstrap ([f1c101a](https://github.com/UK-Export-Finance/mdm-api/commit/f1c101a8afc3789c5e131be93a139511b26a333d))
* **APIM-468:** change how integer config values are parsed ([94dffdd](https://github.com/UK-Export-Finance/mdm-api/commit/94dffdd43b93549b1e549d2935d93aecbba67e12))
* **APIM-468:** change how integer config values are parsed ([#357](https://github.com/UK-Export-Finance/mdm-api/issues/357)) ([ee24d08](https://github.com/UK-Export-Finance/mdm-api/commit/ee24d08bcf636ec2c118dd7ce30f55e9de411f58))
* **APIM-468:** copying missed unit test for get-int-config helper ([9a2a452](https://github.com/UK-Export-Finance/mdm-api/commit/9a2a4522602e0b1d9ce42b0a7eeef544c3f74157))
* **APIM-468:** merge main branch ([2ec2c5f](https://github.com/UK-Export-Finance/mdm-api/commit/2ec2c5f800b356aea6df9f64c186edf87a87b0ca))
* **APIM-468:** removed undefined return var type ([835b65f](https://github.com/UK-Export-Finance/mdm-api/commit/835b65fd9ec6bf0450afdfca62345b97a2a9adbe))
* **APIM-468:** renaming section in unit test ([1b5cfe3](https://github.com/UK-Export-Finance/mdm-api/commit/1b5cfe361914ed4c72af053c40c424c56caba3a8))
* **apim-538:** add environment variable for log format ([#337](https://github.com/UK-Export-Finance/mdm-api/issues/337)) ([fc54db2](https://github.com/UK-Export-Finance/mdm-api/commit/fc54db25340f8ac2c5838c8c710d5946e834da36))
* **APIM-538:** update single line log format env var ([#365](https://github.com/UK-Export-Finance/mdm-api/issues/365)) ([957c95a](https://github.com/UK-Export-Finance/mdm-api/commit/957c95ad5c88485cb064100624d89d9631a42705))
* **APIM-582:** remove unused endpoint GET /constants/spi ([04cac62](https://github.com/UK-Export-Finance/mdm-api/commit/04cac627359f1611a3a8ffa82b2f70edc368a8b9))
* **APIM-582:** remove unused endpoint GET /constants/spi ([#427](https://github.com/UK-Export-Finance/mdm-api/issues/427)) ([b431841](https://github.com/UK-Export-Finance/mdm-api/commit/b431841c65c5b181cbf5a1d1b05a9fe5c4683264))
* **DTFS-7052:** added GET `/geospatial/addresses/postcode` endpoint for Ordnance Survey API data ([#804](https://github.com/UK-Export-Finance/mdm-api/issues/804)) ([4963371](https://github.com/UK-Export-Finance/mdm-api/commit/496337123accb88225c1cb1d159d86621eae7b7b))
* **DTFS2-7049:** adding new env variables to docker-compose.yml ([3ca57f0](https://github.com/UK-Export-Finance/mdm-api/commit/3ca57f0cfdbddf1ac1285164b0aa2c214e04a429))
* **DTFS2-7052:** actioning PR comments ([e012eb4](https://github.com/UK-Export-Finance/mdm-api/commit/e012eb4a7912dcb254bfa0e7c2f5d2794f11ab58))
* **DTFS2-7052:** actioning PR comments ([7d15b07](https://github.com/UK-Export-Finance/mdm-api/commit/7d15b07ef4126f99ffcf6189deac2b2391633edd))
* **DTFS2-7052:** adding constants and examples ([a3d5433](https://github.com/UK-Export-Finance/mdm-api/commit/a3d54338610f50f4824d6c6eeffa50ebdb6e91a2))
* **DTFS2-7052:** adding typescript include for json files, to satisfy lint. I added big examples to json files ([0b79772](https://github.com/UK-Export-Finance/mdm-api/commit/0b79772256a36fc8e5c9b38e3f67a0433984f2ab))
* **DTFS2-7052:** api-tests for geospatial/get-address-by-postcode ([c8cb1bc](https://github.com/UK-Export-Finance/mdm-api/commit/c8cb1bc98c72f3258f8bc9d498effdfe561ff45b))
* **DTFS2-7052:** applying Oscars suggestions on my PR ([f68ac66](https://github.com/UK-Export-Finance/mdm-api/commit/f68ac66050ea3e0515378657f4893eb65f933ed4))
* **DTFS2-7052:** change GET /geospatial/addresses/postcode?postcode= empty response from 200 to 404 ([33c9e65](https://github.com/UK-Export-Finance/mdm-api/commit/33c9e65961e67fdff36c854a7ae9f78c3c1ccd0c))
* **DTFS2-7052:** change husky install to same way as in DTFS project ([889fe1b](https://github.com/UK-Export-Finance/mdm-api/commit/889fe1b0c12152a2964afbf75cdede3ef1e6b48b))
* **DTFS2-7052:** changed documentation for .env setting ORDNANCE_SURVEY_URL ([18fdf4a](https://github.com/UK-Export-Finance/mdm-api/commit/18fdf4a7bdfa77cc84a33f4da43b4c6cbab5f86b))
* **DTFS2-7052:** changed numeric status code 200 to HttpStatus.OK, but just in controller ([3751992](https://github.com/UK-Export-Finance/mdm-api/commit/37519922172ef04acba5ca98d5e24c8039426dcc))
* **DTFS2-7052:** changing variables to use plural ([c020867](https://github.com/UK-Export-Finance/mdm-api/commit/c020867afb451723a8f7d361cb33ef54566355ad))
* **DTFS2-7052:** code style improvements based on PR feedback ([38939db](https://github.com/UK-Export-Finance/mdm-api/commit/38939db77917c9679311e6a793bd339b5f817a26))
* **DTFS2-7052:** comments copy and variable name improvements ([5a0ee93](https://github.com/UK-Export-Finance/mdm-api/commit/5a0ee9342ee2d8505e0e8c08e26b8df67ce37941))
* **DTFS2-7052:** downgrade @commitlint/cli from 19.3.0 to 18.6.0 ([132d179](https://github.com/UK-Export-Finance/mdm-api/commit/132d17933a3086773a2e0824b9a755ab4964c241))
* **DTFS2-7052:** fix address line 1 formating ([db50210](https://github.com/UK-Export-Finance/mdm-api/commit/db50210567ef3e3b542daccb4748726476409934))
* **DTFS2-7052:** fixed lint errors ([17fea54](https://github.com/UK-Export-Finance/mdm-api/commit/17fea546a3cf1e0945e85e653c7829544de41bfc))
* **DTFS2-7052:** improve address test data ([ff5ac7b](https://github.com/UK-Export-Finance/mdm-api/commit/ff5ac7b19b50398c0c4662ca9886987e460dc783))
* **DTFS2-7052:** moving address examples to constants ([de7a0e5](https://github.com/UK-Export-Finance/mdm-api/commit/de7a0e59450dc7f0f4ea57bebd8251f560a5b36b))
* **DTFS2-7052:** moving uk postcode regex to constants and doc improvements ([75b34ac](https://github.com/UK-Export-Finance/mdm-api/commit/75b34ac8c827ee214b219c0c6eff748af79e70a9))
* **DTFS2-7052:** new API modules and endpoint /api/v1/geospatial/addresses/postcode?postcode=W1A1AA ([2cdd0de](https://github.com/UK-Export-Finance/mdm-api/commit/2cdd0dede07399cf6f8d6f52aa2f5efbcf2759f3))
* **DTFS2-7052:** new module geospatial ([14a6a08](https://github.com/UK-Export-Finance/mdm-api/commit/14a6a08485888f854935909f4039cd8eb9d261ae))
* **DTFS2-7052:** package update ([3259347](https://github.com/UK-Export-Finance/mdm-api/commit/32593478c1939697f5d75cea3917716d64711d9d))
* **DTFS2-7052:** refactor api tests to match TFS and solve type issues ([c91144d](https://github.com/UK-Export-Finance/mdm-api/commit/c91144daa23e806764e5cd80382d1726d4380339))
* **DTFS2-7052:** removing unused class GetSearchPostcodeOrdnanceSurveyQueryDto ([32aa1ef](https://github.com/UK-Export-Finance/mdm-api/commit/32aa1ef3e41f4cf5e56ae1952b710d4e8a4fc1da))
* **DTFS2-7052:** renaming enums/geospatial.ts to enums/geospatialCountries.ts ([252b5a1](https://github.com/UK-Export-Finance/mdm-api/commit/252b5a132a04e44df1cc4a66f27f5ff16af67207))
* **DTFS2-7052:** spelling fix ([4c503ca](https://github.com/UK-Export-Finance/mdm-api/commit/4c503caa0895a0c1b8ba5214dd5aeeeeb57f11a1))
* **DTFS2-7052:** tests for ordnance survey API endpoint ([837a482](https://github.com/UK-Export-Finance/mdm-api/commit/837a48254d14c6369f1f394aeb2d0646bdeb2ed9))
* **DTFS2-7052:** tidying up map function ([0da25c3](https://github.com/UK-Export-Finance/mdm-api/commit/0da25c3304cf9491236dbf169092d68972ba1815))
* **DTFS2-7052:** trying to automate husky run on commit ([5fbf3d7](https://github.com/UK-Export-Finance/mdm-api/commit/5fbf3d78f38c1ce7847b482112ce2815ba2e4c7b))
* **DTFS2-7052:** trying to automate husky run on commit ([1b6cf30](https://github.com/UK-Export-Finance/mdm-api/commit/1b6cf30cb4e960e64a2efb2b699aed75b61cd4d2))
* **DTFS2-7052:** typescript type improvement in api-test helper ([6bf5a4d](https://github.com/UK-Export-Finance/mdm-api/commit/6bf5a4d7264d1f388795b679c461f8d753f1b490))
* **DTFS2-7052:** updating API spec ([15743c0](https://github.com/UK-Export-Finance/mdm-api/commit/15743c043b478d660097194f54c396eebe2c352f))
* **DTFS2-7052:** updating api spec definition ([fa73657](https://github.com/UK-Export-Finance/mdm-api/commit/fa73657434c73236ae9efa93036283cc110b4c86))
* **DTFS2-7052:** updating api spec snapshot ([3e215d7](https://github.com/UK-Export-Finance/mdm-api/commit/3e215d726496ffb206c1e1b954efc9c27c4ec685))
* **DTFS2-7052:** updating spec snapshot ([c7ac787](https://github.com/UK-Export-Finance/mdm-api/commit/c7ac787dba058ab17b95865681d2b9afe7a4e005))
* **DTFS2-7052:** work in progress of geospatial-get-address api tests ([21f8006](https://github.com/UK-Export-Finance/mdm-api/commit/21f800652587e12cf8cdcd457353b8a163221311))
* **github-actions:** enable various imperative github actions ([#847](https://github.com/UK-Export-Finance/mdm-api/issues/847)) ([fbfafa9](https://github.com/UK-Export-Finance/mdm-api/commit/fbfafa9d42b98617d12bd83e99c478f5fca971e5))
* **release-please-v4:** updated release-please to v4 [#491](https://github.com/UK-Export-Finance/mdm-api/issues/491) ([#688](https://github.com/UK-Export-Finance/mdm-api/issues/688)) ([cc07b84](https://github.com/UK-Export-Finance/mdm-api/commit/cc07b84ba1b78f8f4f5b0de1bd7052acc8365cb0))
* **template:** pull request template ([b8506bb](https://github.com/UK-Export-Finance/mdm-api/commit/b8506bb391d090335b6f8c2ce3a54e9112325f06))
* **template:** pull request template ([#624](https://github.com/UK-Export-Finance/mdm-api/issues/624)) ([847bdeb](https://github.com/UK-Export-Finance/mdm-api/commit/847bdebdf2880038ad4c2085e55d764bd1380e89))


### Bug Fixes

* **ci:** run ci with legacy-peer-deps argument ([d77d8f3](https://github.com/UK-Export-Finance/mdm-api/commit/d77d8f32282a8c673e6977d6ecbd08acff8be488))
* **deps:** update all ([#396](https://github.com/UK-Export-Finance/mdm-api/issues/396)) ([f851b7b](https://github.com/UK-Export-Finance/mdm-api/commit/f851b7b87dbd04bf8f3178ac52d1a06d0849f024))
* **deps:** update all ([#461](https://github.com/UK-Export-Finance/mdm-api/issues/461)) ([6bf386c](https://github.com/UK-Export-Finance/mdm-api/commit/6bf386cb43883aa78c9aa89886da45c5a6d43f77))
* **deps:** update all ([#469](https://github.com/UK-Export-Finance/mdm-api/issues/469)) ([096b68b](https://github.com/UK-Export-Finance/mdm-api/commit/096b68b88e569fa9e2d0d5fa333ce03b7d99a73b))
* **deps:** update dependency @nestjs/swagger to v7.1.2 ([#331](https://github.com/UK-Export-Finance/mdm-api/issues/331)) ([db807a6](https://github.com/UK-Export-Finance/mdm-api/commit/db807a68f5020c839f890c2d6b2b525e6ed6ffef))
* **deps:** update dependency mssql to v10 ([#463](https://github.com/UK-Export-Finance/mdm-api/issues/463)) ([993410d](https://github.com/UK-Export-Finance/mdm-api/commit/993410d6c5d151640eb774e302cc3827999bbf10))
* **deps:** update dependency tslib to v2.6.1 ([#338](https://github.com/UK-Export-Finance/mdm-api/issues/338)) ([824cc52](https://github.com/UK-Export-Finance/mdm-api/commit/824cc5252162820ba404f755f2083f13195ac9bb))
* **deps:** upgrade pino-http to 10.0.0 ([#888](https://github.com/UK-Export-Finance/mdm-api/issues/888)) ([fac01d4](https://github.com/UK-Export-Finance/mdm-api/commit/fac01d4a38179c673dd213e4dde2a1af8d353b05))
* **env:** updated .env.sample ([bd3f594](https://github.com/UK-Export-Finance/mdm-api/commit/bd3f5945bd3d9ba2c093dcf87e1849df7f22896b))
* **env:** updated `.env.sample` ([#516](https://github.com/UK-Export-Finance/mdm-api/issues/516)) ([c09f145](https://github.com/UK-Export-Finance/mdm-api/commit/c09f1457786e460e474e296c96cd316aaa08787e))
* **format:** formatting fixes ([b14807a](https://github.com/UK-Export-Finance/mdm-api/commit/b14807a3f1edd9f88c56f3c99a1df8cd09bca893))
* **format:** Formatting fixes ([#517](https://github.com/UK-Export-Finance/mdm-api/issues/517)) ([baa3713](https://github.com/UK-Export-Finance/mdm-api/commit/baa3713e3a057385be08d6d58e94ab66c6101658))
* **gitignore:** environment variable introduction ([#364](https://github.com/UK-Export-Finance/mdm-api/issues/364)) ([3336d22](https://github.com/UK-Export-Finance/mdm-api/commit/3336d220d7823b1f27620c37ab353e0cf6e6384f))
* **iac:** ACR ([#343](https://github.com/UK-Export-Finance/mdm-api/issues/343)) ([51d2316](https://github.com/UK-Export-Finance/mdm-api/commit/51d2316707eb3073c67c2eccd14dd8d3194b9a0f))
* **premium-schedule:** added 0 and 4 as acceptable inputs ([#440](https://github.com/UK-Export-Finance/mdm-api/issues/440)) ([270b405](https://github.com/UK-Export-Finance/mdm-api/commit/270b4057fa292a2e39fe3d2cd4910d85a10990fc))
* **release-please-version:** set version to v1.17.0 ([#689](https://github.com/UK-Export-Finance/mdm-api/issues/689)) ([90c6b08](https://github.com/UK-Export-Finance/mdm-api/commit/90c6b08f30428a220fab8ec00052b92bb2d2345b))
* **release-please:** changed to GitHub plugin ([#891](https://github.com/UK-Export-Finance/mdm-api/issues/891)) ([8f3b044](https://github.com/UK-Export-Finance/mdm-api/commit/8f3b044ab86a9fa4083bd68a8cae1000f01d05c4))
* **release:** release version manager ([#532](https://github.com/UK-Export-Finance/mdm-api/issues/532)) ([8a2a3a2](https://github.com/UK-Export-Finance/mdm-api/commit/8a2a3a2fca2a2b2d1eb5f31976a2ca5c78cdca50))
* **spellcheck:** added spellcheck to the pipeline ([#511](https://github.com/UK-Export-Finance/mdm-api/issues/511)) ([8b84855](https://github.com/UK-Export-Finance/mdm-api/commit/8b8485522796db2b1d3056d643345e41032c3a12))
* **tsconfig:** fixed tsconfig file ([d8df948](https://github.com/UK-Export-Finance/mdm-api/commit/d8df948e1d209a0e6319bad5acb237f669636db1))
* **tsconfig:** tsconfig file fix ([e470ec5](https://github.com/UK-Export-Finance/mdm-api/commit/e470ec5f342033c21232c2b6721d6021eeb631fb))

## [1.19.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.18.0...v1.19.0) (2024-05-22)


### Features

* **ami:** migration to Azure AMI ([9854d57](https://github.com/UK-Export-Finance/mdm-api/commit/9854d573182ddedc6e521343d4b23b7b720754fd))
* **ami:** migration to Azure AMI ([#514](https://github.com/UK-Export-Finance/mdm-api/issues/514)) ([bfeaa1e](https://github.com/UK-Export-Finance/mdm-api/commit/bfeaa1e190b1872e346a5866a5df778a859f2f0f))
* **APIM-344:** added test to redact using regex in 'redactStringsInLogArgs' ([709477d](https://github.com/UK-Export-Finance/mdm-api/commit/709477d1ce6a8a8638be08522af57e3cf2cf94d1))
* **APIM-344:** changed redaction in crashed bootstrap and changed redaction in recovered bootstrap ([3a3b646](https://github.com/UK-Export-Finance/mdm-api/commit/3a3b64687187fc3f4c8406da5399ef8135b6a1d1))
* **APIM-344:** fix 2 PR feedback items, change comment and var type ([da02c07](https://github.com/UK-Export-Finance/mdm-api/commit/da02c071096e7c1ba07bc90b9e1b06a77829357e))
* **APIM-344:** handle sensitive details in log messages ([#324](https://github.com/UK-Export-Finance/mdm-api/issues/324)) ([2e5a948](https://github.com/UK-Export-Finance/mdm-api/commit/2e5a948fccee916518bc5e2c07c267071966bf30))
* **APIM-344:** unit test for logger class ConsoleLoggerWithRedact ([4950a04](https://github.com/UK-Export-Finance/mdm-api/commit/4950a0487933cd1797639df1c27526b0cf1de2ec))
* **APIM-344:** use process variable to enable/disable redacting at bootstrap ([f1c101a](https://github.com/UK-Export-Finance/mdm-api/commit/f1c101a8afc3789c5e131be93a139511b26a333d))
* **APIM-468:** change how integer config values are parsed ([94dffdd](https://github.com/UK-Export-Finance/mdm-api/commit/94dffdd43b93549b1e549d2935d93aecbba67e12))
* **APIM-468:** change how integer config values are parsed ([#357](https://github.com/UK-Export-Finance/mdm-api/issues/357)) ([ee24d08](https://github.com/UK-Export-Finance/mdm-api/commit/ee24d08bcf636ec2c118dd7ce30f55e9de411f58))
* **APIM-468:** copying missed unit test for get-int-config helper ([9a2a452](https://github.com/UK-Export-Finance/mdm-api/commit/9a2a4522602e0b1d9ce42b0a7eeef544c3f74157))
* **APIM-468:** merge main branch ([2ec2c5f](https://github.com/UK-Export-Finance/mdm-api/commit/2ec2c5f800b356aea6df9f64c186edf87a87b0ca))
* **APIM-468:** removed undefined return var type ([835b65f](https://github.com/UK-Export-Finance/mdm-api/commit/835b65fd9ec6bf0450afdfca62345b97a2a9adbe))
* **APIM-468:** renaming section in unit test ([1b5cfe3](https://github.com/UK-Export-Finance/mdm-api/commit/1b5cfe361914ed4c72af053c40c424c56caba3a8))
* **apim-538:** add environment variable for log format ([#337](https://github.com/UK-Export-Finance/mdm-api/issues/337)) ([fc54db2](https://github.com/UK-Export-Finance/mdm-api/commit/fc54db25340f8ac2c5838c8c710d5946e834da36))
* **APIM-538:** update single line log format env var ([#365](https://github.com/UK-Export-Finance/mdm-api/issues/365)) ([957c95a](https://github.com/UK-Export-Finance/mdm-api/commit/957c95ad5c88485cb064100624d89d9631a42705))
* **APIM-582:** remove unused endpoint GET /constants/spi ([04cac62](https://github.com/UK-Export-Finance/mdm-api/commit/04cac627359f1611a3a8ffa82b2f70edc368a8b9))
* **APIM-582:** remove unused endpoint GET /constants/spi ([#427](https://github.com/UK-Export-Finance/mdm-api/issues/427)) ([b431841](https://github.com/UK-Export-Finance/mdm-api/commit/b431841c65c5b181cbf5a1d1b05a9fe5c4683264))
* **DTFS-7052:** added GET `/geospatial/addresses/postcode` endpoint for Ordnance Survey API data ([#804](https://github.com/UK-Export-Finance/mdm-api/issues/804)) ([4963371](https://github.com/UK-Export-Finance/mdm-api/commit/496337123accb88225c1cb1d159d86621eae7b7b))
* **DTFS2-7049:** adding new env variables to docker-compose.yml ([3ca57f0](https://github.com/UK-Export-Finance/mdm-api/commit/3ca57f0cfdbddf1ac1285164b0aa2c214e04a429))
* **DTFS2-7052:** actioning PR comments ([e012eb4](https://github.com/UK-Export-Finance/mdm-api/commit/e012eb4a7912dcb254bfa0e7c2f5d2794f11ab58))
* **DTFS2-7052:** actioning PR comments ([7d15b07](https://github.com/UK-Export-Finance/mdm-api/commit/7d15b07ef4126f99ffcf6189deac2b2391633edd))
* **DTFS2-7052:** adding constants and examples ([a3d5433](https://github.com/UK-Export-Finance/mdm-api/commit/a3d54338610f50f4824d6c6eeffa50ebdb6e91a2))
* **DTFS2-7052:** adding typescript include for json files, to satisfy lint. I added big examples to json files ([0b79772](https://github.com/UK-Export-Finance/mdm-api/commit/0b79772256a36fc8e5c9b38e3f67a0433984f2ab))
* **DTFS2-7052:** api-tests for geospatial/get-address-by-postcode ([c8cb1bc](https://github.com/UK-Export-Finance/mdm-api/commit/c8cb1bc98c72f3258f8bc9d498effdfe561ff45b))
* **DTFS2-7052:** applying Oscars suggestions on my PR ([f68ac66](https://github.com/UK-Export-Finance/mdm-api/commit/f68ac66050ea3e0515378657f4893eb65f933ed4))
* **DTFS2-7052:** change GET /geospatial/addresses/postcode?postcode= empty response from 200 to 404 ([33c9e65](https://github.com/UK-Export-Finance/mdm-api/commit/33c9e65961e67fdff36c854a7ae9f78c3c1ccd0c))
* **DTFS2-7052:** change husky install to same way as in DTFS project ([889fe1b](https://github.com/UK-Export-Finance/mdm-api/commit/889fe1b0c12152a2964afbf75cdede3ef1e6b48b))
* **DTFS2-7052:** changed documentation for .env setting ORDNANCE_SURVEY_URL ([18fdf4a](https://github.com/UK-Export-Finance/mdm-api/commit/18fdf4a7bdfa77cc84a33f4da43b4c6cbab5f86b))
* **DTFS2-7052:** changed numeric status code 200 to HttpStatus.OK, but just in controller ([3751992](https://github.com/UK-Export-Finance/mdm-api/commit/37519922172ef04acba5ca98d5e24c8039426dcc))
* **DTFS2-7052:** changing variables to use plural ([c020867](https://github.com/UK-Export-Finance/mdm-api/commit/c020867afb451723a8f7d361cb33ef54566355ad))
* **DTFS2-7052:** code style improvements based on PR feedback ([38939db](https://github.com/UK-Export-Finance/mdm-api/commit/38939db77917c9679311e6a793bd339b5f817a26))
* **DTFS2-7052:** comments copy and variable name improvements ([5a0ee93](https://github.com/UK-Export-Finance/mdm-api/commit/5a0ee9342ee2d8505e0e8c08e26b8df67ce37941))
* **DTFS2-7052:** downgrade @commitlint/cli from 19.3.0 to 18.6.0 ([132d179](https://github.com/UK-Export-Finance/mdm-api/commit/132d17933a3086773a2e0824b9a755ab4964c241))
* **DTFS2-7052:** fix address line 1 formating ([db50210](https://github.com/UK-Export-Finance/mdm-api/commit/db50210567ef3e3b542daccb4748726476409934))
* **DTFS2-7052:** fixed lint errors ([17fea54](https://github.com/UK-Export-Finance/mdm-api/commit/17fea546a3cf1e0945e85e653c7829544de41bfc))
* **DTFS2-7052:** improve address test data ([ff5ac7b](https://github.com/UK-Export-Finance/mdm-api/commit/ff5ac7b19b50398c0c4662ca9886987e460dc783))
* **DTFS2-7052:** moving address examples to constants ([de7a0e5](https://github.com/UK-Export-Finance/mdm-api/commit/de7a0e59450dc7f0f4ea57bebd8251f560a5b36b))
* **DTFS2-7052:** moving uk postcode regex to constants and doc improvements ([75b34ac](https://github.com/UK-Export-Finance/mdm-api/commit/75b34ac8c827ee214b219c0c6eff748af79e70a9))
* **DTFS2-7052:** new API modules and endpoint /api/v1/geospatial/addresses/postcode?postcode=W1A1AA ([2cdd0de](https://github.com/UK-Export-Finance/mdm-api/commit/2cdd0dede07399cf6f8d6f52aa2f5efbcf2759f3))
* **DTFS2-7052:** new module geospatial ([14a6a08](https://github.com/UK-Export-Finance/mdm-api/commit/14a6a08485888f854935909f4039cd8eb9d261ae))
* **DTFS2-7052:** package update ([3259347](https://github.com/UK-Export-Finance/mdm-api/commit/32593478c1939697f5d75cea3917716d64711d9d))
* **DTFS2-7052:** refactor api tests to match TFS and solve type issues ([c91144d](https://github.com/UK-Export-Finance/mdm-api/commit/c91144daa23e806764e5cd80382d1726d4380339))
* **DTFS2-7052:** removing unused class GetSearchPostcodeOrdnanceSurveyQueryDto ([32aa1ef](https://github.com/UK-Export-Finance/mdm-api/commit/32aa1ef3e41f4cf5e56ae1952b710d4e8a4fc1da))
* **DTFS2-7052:** renaming enums/geospatial.ts to enums/geospatialCountries.ts ([252b5a1](https://github.com/UK-Export-Finance/mdm-api/commit/252b5a132a04e44df1cc4a66f27f5ff16af67207))
* **DTFS2-7052:** spelling fix ([4c503ca](https://github.com/UK-Export-Finance/mdm-api/commit/4c503caa0895a0c1b8ba5214dd5aeeeeb57f11a1))
* **DTFS2-7052:** tests for ordnance survey API endpoint ([837a482](https://github.com/UK-Export-Finance/mdm-api/commit/837a48254d14c6369f1f394aeb2d0646bdeb2ed9))
* **DTFS2-7052:** tidying up map function ([0da25c3](https://github.com/UK-Export-Finance/mdm-api/commit/0da25c3304cf9491236dbf169092d68972ba1815))
* **DTFS2-7052:** trying to automate husky run on commit ([5fbf3d7](https://github.com/UK-Export-Finance/mdm-api/commit/5fbf3d78f38c1ce7847b482112ce2815ba2e4c7b))
* **DTFS2-7052:** trying to automate husky run on commit ([1b6cf30](https://github.com/UK-Export-Finance/mdm-api/commit/1b6cf30cb4e960e64a2efb2b699aed75b61cd4d2))
* **DTFS2-7052:** typescript type improvement in api-test helper ([6bf5a4d](https://github.com/UK-Export-Finance/mdm-api/commit/6bf5a4d7264d1f388795b679c461f8d753f1b490))
* **DTFS2-7052:** updating API spec ([15743c0](https://github.com/UK-Export-Finance/mdm-api/commit/15743c043b478d660097194f54c396eebe2c352f))
* **DTFS2-7052:** updating api spec definition ([fa73657](https://github.com/UK-Export-Finance/mdm-api/commit/fa73657434c73236ae9efa93036283cc110b4c86))
* **DTFS2-7052:** updating api spec snapshot ([3e215d7](https://github.com/UK-Export-Finance/mdm-api/commit/3e215d726496ffb206c1e1b954efc9c27c4ec685))
* **DTFS2-7052:** updating spec snapshot ([c7ac787](https://github.com/UK-Export-Finance/mdm-api/commit/c7ac787dba058ab17b95865681d2b9afe7a4e005))
* **DTFS2-7052:** work in progress of geospatial-get-address api tests ([21f8006](https://github.com/UK-Export-Finance/mdm-api/commit/21f800652587e12cf8cdcd457353b8a163221311))
* **github-actions:** enable various imperative github actions ([#847](https://github.com/UK-Export-Finance/mdm-api/issues/847)) ([fbfafa9](https://github.com/UK-Export-Finance/mdm-api/commit/fbfafa9d42b98617d12bd83e99c478f5fca971e5))
* **release-please-v4:** updated release-please to v4 [#491](https://github.com/UK-Export-Finance/mdm-api/issues/491) ([#688](https://github.com/UK-Export-Finance/mdm-api/issues/688)) ([cc07b84](https://github.com/UK-Export-Finance/mdm-api/commit/cc07b84ba1b78f8f4f5b0de1bd7052acc8365cb0))
* **template:** pull request template ([b8506bb](https://github.com/UK-Export-Finance/mdm-api/commit/b8506bb391d090335b6f8c2ce3a54e9112325f06))
* **template:** pull request template ([#624](https://github.com/UK-Export-Finance/mdm-api/issues/624)) ([847bdeb](https://github.com/UK-Export-Finance/mdm-api/commit/847bdebdf2880038ad4c2085e55d764bd1380e89))


### Bug Fixes

* **ci:** run ci with legacy-peer-deps argument ([d77d8f3](https://github.com/UK-Export-Finance/mdm-api/commit/d77d8f32282a8c673e6977d6ecbd08acff8be488))
* **deps:** update all ([#396](https://github.com/UK-Export-Finance/mdm-api/issues/396)) ([f851b7b](https://github.com/UK-Export-Finance/mdm-api/commit/f851b7b87dbd04bf8f3178ac52d1a06d0849f024))
* **deps:** update all ([#461](https://github.com/UK-Export-Finance/mdm-api/issues/461)) ([6bf386c](https://github.com/UK-Export-Finance/mdm-api/commit/6bf386cb43883aa78c9aa89886da45c5a6d43f77))
* **deps:** update all ([#469](https://github.com/UK-Export-Finance/mdm-api/issues/469)) ([096b68b](https://github.com/UK-Export-Finance/mdm-api/commit/096b68b88e569fa9e2d0d5fa333ce03b7d99a73b))
* **deps:** update dependency @nestjs/swagger to v7.1.2 ([#331](https://github.com/UK-Export-Finance/mdm-api/issues/331)) ([db807a6](https://github.com/UK-Export-Finance/mdm-api/commit/db807a68f5020c839f890c2d6b2b525e6ed6ffef))
* **deps:** update dependency mssql to v10 ([#463](https://github.com/UK-Export-Finance/mdm-api/issues/463)) ([993410d](https://github.com/UK-Export-Finance/mdm-api/commit/993410d6c5d151640eb774e302cc3827999bbf10))
* **deps:** update dependency tslib to v2.6.1 ([#338](https://github.com/UK-Export-Finance/mdm-api/issues/338)) ([824cc52](https://github.com/UK-Export-Finance/mdm-api/commit/824cc5252162820ba404f755f2083f13195ac9bb))
* **deps:** upgrade pino-http to 10.0.0 ([#888](https://github.com/UK-Export-Finance/mdm-api/issues/888)) ([fac01d4](https://github.com/UK-Export-Finance/mdm-api/commit/fac01d4a38179c673dd213e4dde2a1af8d353b05))
* **env:** updated .env.sample ([bd3f594](https://github.com/UK-Export-Finance/mdm-api/commit/bd3f5945bd3d9ba2c093dcf87e1849df7f22896b))
* **env:** updated `.env.sample` ([#516](https://github.com/UK-Export-Finance/mdm-api/issues/516)) ([c09f145](https://github.com/UK-Export-Finance/mdm-api/commit/c09f1457786e460e474e296c96cd316aaa08787e))
* **format:** formatting fixes ([b14807a](https://github.com/UK-Export-Finance/mdm-api/commit/b14807a3f1edd9f88c56f3c99a1df8cd09bca893))
* **format:** Formatting fixes ([#517](https://github.com/UK-Export-Finance/mdm-api/issues/517)) ([baa3713](https://github.com/UK-Export-Finance/mdm-api/commit/baa3713e3a057385be08d6d58e94ab66c6101658))
* **gitignore:** environment variable introduction ([#364](https://github.com/UK-Export-Finance/mdm-api/issues/364)) ([3336d22](https://github.com/UK-Export-Finance/mdm-api/commit/3336d220d7823b1f27620c37ab353e0cf6e6384f))
* **iac:** ACR ([#343](https://github.com/UK-Export-Finance/mdm-api/issues/343)) ([51d2316](https://github.com/UK-Export-Finance/mdm-api/commit/51d2316707eb3073c67c2eccd14dd8d3194b9a0f))
* **premium-schedule:** added 0 and 4 as acceptable inputs ([#440](https://github.com/UK-Export-Finance/mdm-api/issues/440)) ([270b405](https://github.com/UK-Export-Finance/mdm-api/commit/270b4057fa292a2e39fe3d2cd4910d85a10990fc))
* **release-please-version:** set version to v1.17.0 ([#689](https://github.com/UK-Export-Finance/mdm-api/issues/689)) ([90c6b08](https://github.com/UK-Export-Finance/mdm-api/commit/90c6b08f30428a220fab8ec00052b92bb2d2345b))
* **release:** release version manager ([#532](https://github.com/UK-Export-Finance/mdm-api/issues/532)) ([8a2a3a2](https://github.com/UK-Export-Finance/mdm-api/commit/8a2a3a2fca2a2b2d1eb5f31976a2ca5c78cdca50))
* **spellcheck:** added spellcheck to the pipeline ([#511](https://github.com/UK-Export-Finance/mdm-api/issues/511)) ([8b84855](https://github.com/UK-Export-Finance/mdm-api/commit/8b8485522796db2b1d3056d643345e41032c3a12))
* **tsconfig:** fixed tsconfig file ([d8df948](https://github.com/UK-Export-Finance/mdm-api/commit/d8df948e1d209a0e6319bad5acb237f669636db1))
* **tsconfig:** tsconfig file fix ([e470ec5](https://github.com/UK-Export-Finance/mdm-api/commit/e470ec5f342033c21232c2b6721d6021eeb631fb))

## [1.18.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.17.0...v1.18.0) (2024-05-22)


### Features

* **DTFS-7052:** added GET `/geospatial/addresses/postcode` endpoint for Ordnance Survey API data ([#804](https://github.com/UK-Export-Finance/mdm-api/issues/804)) ([4963371](https://github.com/UK-Export-Finance/mdm-api/commit/496337123accb88225c1cb1d159d86621eae7b7b))
* **DTFS2-7049:** adding new env variables to docker-compose.yml ([3ca57f0](https://github.com/UK-Export-Finance/mdm-api/commit/3ca57f0cfdbddf1ac1285164b0aa2c214e04a429))
* **DTFS2-7052:** actioning PR comments ([e012eb4](https://github.com/UK-Export-Finance/mdm-api/commit/e012eb4a7912dcb254bfa0e7c2f5d2794f11ab58))
* **DTFS2-7052:** actioning PR comments ([7d15b07](https://github.com/UK-Export-Finance/mdm-api/commit/7d15b07ef4126f99ffcf6189deac2b2391633edd))
* **DTFS2-7052:** adding constants and examples ([a3d5433](https://github.com/UK-Export-Finance/mdm-api/commit/a3d54338610f50f4824d6c6eeffa50ebdb6e91a2))
* **DTFS2-7052:** adding typescript include for json files, to satisfy lint. I added big examples to json files ([0b79772](https://github.com/UK-Export-Finance/mdm-api/commit/0b79772256a36fc8e5c9b38e3f67a0433984f2ab))
* **DTFS2-7052:** api-tests for geospatial/get-address-by-postcode ([c8cb1bc](https://github.com/UK-Export-Finance/mdm-api/commit/c8cb1bc98c72f3258f8bc9d498effdfe561ff45b))
* **DTFS2-7052:** applying Oscars suggestions on my PR ([f68ac66](https://github.com/UK-Export-Finance/mdm-api/commit/f68ac66050ea3e0515378657f4893eb65f933ed4))
* **DTFS2-7052:** change GET /geospatial/addresses/postcode?postcode= empty response from 200 to 404 ([33c9e65](https://github.com/UK-Export-Finance/mdm-api/commit/33c9e65961e67fdff36c854a7ae9f78c3c1ccd0c))
* **DTFS2-7052:** change husky install to same way as in DTFS project ([889fe1b](https://github.com/UK-Export-Finance/mdm-api/commit/889fe1b0c12152a2964afbf75cdede3ef1e6b48b))
* **DTFS2-7052:** changed documentation for .env setting ORDNANCE_SURVEY_URL ([18fdf4a](https://github.com/UK-Export-Finance/mdm-api/commit/18fdf4a7bdfa77cc84a33f4da43b4c6cbab5f86b))
* **DTFS2-7052:** changed numeric status code 200 to HttpStatus.OK, but just in controller ([3751992](https://github.com/UK-Export-Finance/mdm-api/commit/37519922172ef04acba5ca98d5e24c8039426dcc))
* **DTFS2-7052:** changing variables to use plural ([c020867](https://github.com/UK-Export-Finance/mdm-api/commit/c020867afb451723a8f7d361cb33ef54566355ad))
* **DTFS2-7052:** code style improvements based on PR feedback ([38939db](https://github.com/UK-Export-Finance/mdm-api/commit/38939db77917c9679311e6a793bd339b5f817a26))
* **DTFS2-7052:** comments copy and variable name improvements ([5a0ee93](https://github.com/UK-Export-Finance/mdm-api/commit/5a0ee9342ee2d8505e0e8c08e26b8df67ce37941))
* **DTFS2-7052:** downgrade @commitlint/cli from 19.3.0 to 18.6.0 ([132d179](https://github.com/UK-Export-Finance/mdm-api/commit/132d17933a3086773a2e0824b9a755ab4964c241))
* **DTFS2-7052:** fix address line 1 formating ([db50210](https://github.com/UK-Export-Finance/mdm-api/commit/db50210567ef3e3b542daccb4748726476409934))
* **DTFS2-7052:** fixed lint errors ([17fea54](https://github.com/UK-Export-Finance/mdm-api/commit/17fea546a3cf1e0945e85e653c7829544de41bfc))
* **DTFS2-7052:** improve address test data ([ff5ac7b](https://github.com/UK-Export-Finance/mdm-api/commit/ff5ac7b19b50398c0c4662ca9886987e460dc783))
* **DTFS2-7052:** moving address examples to constants ([de7a0e5](https://github.com/UK-Export-Finance/mdm-api/commit/de7a0e59450dc7f0f4ea57bebd8251f560a5b36b))
* **DTFS2-7052:** moving uk postcode regex to constants and doc improvements ([75b34ac](https://github.com/UK-Export-Finance/mdm-api/commit/75b34ac8c827ee214b219c0c6eff748af79e70a9))
* **DTFS2-7052:** new API modules and endpoint /api/v1/geospatial/addresses/postcode?postcode=W1A1AA ([2cdd0de](https://github.com/UK-Export-Finance/mdm-api/commit/2cdd0dede07399cf6f8d6f52aa2f5efbcf2759f3))
* **DTFS2-7052:** new module geospatial ([14a6a08](https://github.com/UK-Export-Finance/mdm-api/commit/14a6a08485888f854935909f4039cd8eb9d261ae))
* **DTFS2-7052:** package update ([3259347](https://github.com/UK-Export-Finance/mdm-api/commit/32593478c1939697f5d75cea3917716d64711d9d))
* **DTFS2-7052:** refactor api tests to match TFS and solve type issues ([c91144d](https://github.com/UK-Export-Finance/mdm-api/commit/c91144daa23e806764e5cd80382d1726d4380339))
* **DTFS2-7052:** removing unused class GetSearchPostcodeOrdnanceSurveyQueryDto ([32aa1ef](https://github.com/UK-Export-Finance/mdm-api/commit/32aa1ef3e41f4cf5e56ae1952b710d4e8a4fc1da))
* **DTFS2-7052:** renaming enums/geospatial.ts to enums/geospatialCountries.ts ([252b5a1](https://github.com/UK-Export-Finance/mdm-api/commit/252b5a132a04e44df1cc4a66f27f5ff16af67207))
* **DTFS2-7052:** spelling fix ([4c503ca](https://github.com/UK-Export-Finance/mdm-api/commit/4c503caa0895a0c1b8ba5214dd5aeeeeb57f11a1))
* **DTFS2-7052:** tests for ordnance survey API endpoint ([837a482](https://github.com/UK-Export-Finance/mdm-api/commit/837a48254d14c6369f1f394aeb2d0646bdeb2ed9))
* **DTFS2-7052:** tidying up map function ([0da25c3](https://github.com/UK-Export-Finance/mdm-api/commit/0da25c3304cf9491236dbf169092d68972ba1815))
* **DTFS2-7052:** trying to automate husky run on commit ([5fbf3d7](https://github.com/UK-Export-Finance/mdm-api/commit/5fbf3d78f38c1ce7847b482112ce2815ba2e4c7b))
* **DTFS2-7052:** trying to automate husky run on commit ([1b6cf30](https://github.com/UK-Export-Finance/mdm-api/commit/1b6cf30cb4e960e64a2efb2b699aed75b61cd4d2))
* **DTFS2-7052:** typescript type improvement in api-test helper ([6bf5a4d](https://github.com/UK-Export-Finance/mdm-api/commit/6bf5a4d7264d1f388795b679c461f8d753f1b490))
* **DTFS2-7052:** updating API spec ([15743c0](https://github.com/UK-Export-Finance/mdm-api/commit/15743c043b478d660097194f54c396eebe2c352f))
* **DTFS2-7052:** updating api spec definition ([fa73657](https://github.com/UK-Export-Finance/mdm-api/commit/fa73657434c73236ae9efa93036283cc110b4c86))
* **DTFS2-7052:** updating api spec snapshot ([3e215d7](https://github.com/UK-Export-Finance/mdm-api/commit/3e215d726496ffb206c1e1b954efc9c27c4ec685))
* **DTFS2-7052:** updating spec snapshot ([c7ac787](https://github.com/UK-Export-Finance/mdm-api/commit/c7ac787dba058ab17b95865681d2b9afe7a4e005))
* **DTFS2-7052:** work in progress of geospatial-get-address api tests ([21f8006](https://github.com/UK-Export-Finance/mdm-api/commit/21f800652587e12cf8cdcd457353b8a163221311))
* **github-actions:** enable various imperative github actions ([#847](https://github.com/UK-Export-Finance/mdm-api/issues/847)) ([fbfafa9](https://github.com/UK-Export-Finance/mdm-api/commit/fbfafa9d42b98617d12bd83e99c478f5fca971e5))


### Bug Fixes

* **release-please-version:** set version to v1.17.0 ([#689](https://github.com/UK-Export-Finance/mdm-api/issues/689)) ([90c6b08](https://github.com/UK-Export-Finance/mdm-api/commit/90c6b08f30428a220fab8ec00052b92bb2d2345b))

## [1.17.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.16.0...v1.17.0) (2023-12-10)


### Features

* **ami:** migration to Azure AMI ([9854d57](https://github.com/UK-Export-Finance/mdm-api/commit/9854d573182ddedc6e521343d4b23b7b720754fd))
* **ami:** migration to Azure AMI ([#514](https://github.com/UK-Export-Finance/mdm-api/issues/514)) ([bfeaa1e](https://github.com/UK-Export-Finance/mdm-api/commit/bfeaa1e190b1872e346a5866a5df778a859f2f0f))
* **template:** pull request template ([b8506bb](https://github.com/UK-Export-Finance/mdm-api/commit/b8506bb391d090335b6f8c2ce3a54e9112325f06))
* **template:** pull request template ([#624](https://github.com/UK-Export-Finance/mdm-api/issues/624)) ([847bdeb](https://github.com/UK-Export-Finance/mdm-api/commit/847bdebdf2880038ad4c2085e55d764bd1380e89))


### Bug Fixes

* **ci:** run ci with legacy-peer-deps argument ([d77d8f3](https://github.com/UK-Export-Finance/mdm-api/commit/d77d8f32282a8c673e6977d6ecbd08acff8be488))
* **env:** updated .env.sample ([bd3f594](https://github.com/UK-Export-Finance/mdm-api/commit/bd3f5945bd3d9ba2c093dcf87e1849df7f22896b))
* **env:** updated `.env.sample` ([#516](https://github.com/UK-Export-Finance/mdm-api/issues/516)) ([c09f145](https://github.com/UK-Export-Finance/mdm-api/commit/c09f1457786e460e474e296c96cd316aaa08787e))
* **format:** formatting fixes ([b14807a](https://github.com/UK-Export-Finance/mdm-api/commit/b14807a3f1edd9f88c56f3c99a1df8cd09bca893))
* **format:** Formatting fixes ([#517](https://github.com/UK-Export-Finance/mdm-api/issues/517)) ([baa3713](https://github.com/UK-Export-Finance/mdm-api/commit/baa3713e3a057385be08d6d58e94ab66c6101658))
* **release:** release version manager ([#532](https://github.com/UK-Export-Finance/mdm-api/issues/532)) ([8a2a3a2](https://github.com/UK-Export-Finance/mdm-api/commit/8a2a3a2fca2a2b2d1eb5f31976a2ca5c78cdca50))
* **spellcheck:** added spellcheck to the pipeline ([#511](https://github.com/UK-Export-Finance/mdm-api/issues/511)) ([8b84855](https://github.com/UK-Export-Finance/mdm-api/commit/8b8485522796db2b1d3056d643345e41032c3a12))
* **tsconfig:** fixed tsconfig file ([d8df948](https://github.com/UK-Export-Finance/mdm-api/commit/d8df948e1d209a0e6319bad5acb237f669636db1))
* **tsconfig:** tsconfig file fix ([e470ec5](https://github.com/UK-Export-Finance/mdm-api/commit/e470ec5f342033c21232c2b6721d6021eeb631fb))

### Miscellaneous

* **deps-dev:** Bump @babel/traverse from 7.23.0 to 7.23.2 ([#549](https://github.com/UK-Export-Finance/mdm-api/issues/549)) ([31d3a71](https://github.com/UK-Export-Finance/mdm-api/commit/31d3a717e8acb32a3c504184d2faa575cd96a910))
* **deps-dev:** Bump @commitlint/cli from 17.7.1 to 17.7.2 ([#512](https://github.com/UK-Export-Finance/mdm-api/issues/512)) ([f74d3af](https://github.com/UK-Export-Finance/mdm-api/commit/f74d3af37ab97dac8dc2a61c512682968e54da15))
* **deps-dev:** Bump @commitlint/cli from 17.7.2 to 17.8.0 ([#543](https://github.com/UK-Export-Finance/mdm-api/issues/543)) ([09e391c](https://github.com/UK-Export-Finance/mdm-api/commit/09e391c7cee374d23a4a5bc75d1cb0a02165b5a4))
* **deps-dev:** Bump @commitlint/cli from 18.0.0 to 18.2.0 ([#578](https://github.com/UK-Export-Finance/mdm-api/issues/578)) ([b3553a0](https://github.com/UK-Export-Finance/mdm-api/commit/b3553a0af24386400fafc838b6ba126b83267bbc))
* **deps-dev:** Bump @commitlint/config-conventional from 17.7.0 to 17.8.0 ([#545](https://github.com/UK-Export-Finance/mdm-api/issues/545)) ([644dc8e](https://github.com/UK-Export-Finance/mdm-api/commit/644dc8eccbc2ed7acff0db1b3e2dc9699c05cae9))
* **deps-dev:** Bump @commitlint/config-conventional from 18.0.0 to 18.1.0 ([#584](https://github.com/UK-Export-Finance/mdm-api/issues/584)) ([49d1dfd](https://github.com/UK-Export-Finance/mdm-api/commit/49d1dfd849da51e009e38205a7e56b7bc0d6f99b))
* **deps-dev:** Bump @commitlint/config-conventional from 18.1.0 to 18.4.3 ([#621](https://github.com/UK-Export-Finance/mdm-api/issues/621)) ([1916070](https://github.com/UK-Export-Finance/mdm-api/commit/191607098b7f99ee093eefc590a4e2d1e39be541))
* **deps-dev:** Bump @nestjs/cli from 10.1.17 to 10.1.18 ([#494](https://github.com/UK-Export-Finance/mdm-api/issues/494)) ([28cbe10](https://github.com/UK-Export-Finance/mdm-api/commit/28cbe10a0a2dd17cd5a62c0631911ebb826c0d97))
* **deps-dev:** Bump @nestjs/cli from 10.1.18 to 10.2.0 ([#566](https://github.com/UK-Export-Finance/mdm-api/issues/566)) ([d3d0af1](https://github.com/UK-Export-Finance/mdm-api/commit/d3d0af14e3615987eff5a9e5df6fc3806fa78647))
* **deps-dev:** Bump @nestjs/cli from 10.2.0 to 10.2.1 ([#580](https://github.com/UK-Export-Finance/mdm-api/issues/580)) ([2d88f6a](https://github.com/UK-Export-Finance/mdm-api/commit/2d88f6a90e2050997cb9d66ae22d9d3c4ce9fed3))
* **deps-dev:** Bump @nestjs/schematics from 10.0.2 to 10.0.3 ([#583](https://github.com/UK-Export-Finance/mdm-api/issues/583)) ([ee64cf7](https://github.com/UK-Export-Finance/mdm-api/commit/ee64cf76e4a79e17e8f1c7a22d6c0375cb57f5b7))
* **deps-dev:** Bump @nestjs/testing from 10.2.5 to 10.2.6 ([#501](https://github.com/UK-Export-Finance/mdm-api/issues/501)) ([6dd9ebe](https://github.com/UK-Export-Finance/mdm-api/commit/6dd9ebe8208b2aff88920efcfa674159ce5d7448))
* **deps-dev:** Bump @nestjs/testing from 10.2.6 to 10.2.7 ([#528](https://github.com/UK-Export-Finance/mdm-api/issues/528)) ([0077c73](https://github.com/UK-Export-Finance/mdm-api/commit/0077c733a47b3180c7dcc9ea4288ece95407dcca))
* **deps-dev:** Bump @nestjs/testing from 10.2.7 to 10.2.8 ([#588](https://github.com/UK-Export-Finance/mdm-api/issues/588)) ([6b6ce05](https://github.com/UK-Export-Finance/mdm-api/commit/6b6ce05d2b1c12fd890efd2b1638dce79149e3e8))
* **deps-dev:** Bump @types/chance from 1.1.4 to 1.1.5 ([#552](https://github.com/UK-Export-Finance/mdm-api/issues/552)) ([8df0a47](https://github.com/UK-Export-Finance/mdm-api/commit/8df0a47aade4f10b18c1a2b8536167e951422ffa))
* **deps-dev:** Bump @types/compression from 1.7.3 to 1.7.4 ([#551](https://github.com/UK-Export-Finance/mdm-api/issues/551)) ([d3261bf](https://github.com/UK-Export-Finance/mdm-api/commit/d3261bf3161c31d8c64699734b885be02ce818ce))
* **deps-dev:** Bump @types/compression from 1.7.4 to 1.7.5 ([#604](https://github.com/UK-Export-Finance/mdm-api/issues/604)) ([c2d57be](https://github.com/UK-Export-Finance/mdm-api/commit/c2d57be88577008b60f8b81c9da321959d7c4f35))
* **deps-dev:** Bump @types/express from 4.17.17 to 4.17.18 ([#499](https://github.com/UK-Export-Finance/mdm-api/issues/499)) ([235beb8](https://github.com/UK-Export-Finance/mdm-api/commit/235beb84b5b69236ab206eaddb2a09d0640a37c6))
* **deps-dev:** Bump @types/express from 4.17.18 to 4.17.19 ([#537](https://github.com/UK-Export-Finance/mdm-api/issues/537)) ([6775618](https://github.com/UK-Export-Finance/mdm-api/commit/6775618676753abd907923c0eaa0a73831845c1e))
* **deps-dev:** Bump @types/express from 4.17.19 to 4.17.20 ([#553](https://github.com/UK-Export-Finance/mdm-api/issues/553)) ([daf4ad1](https://github.com/UK-Export-Finance/mdm-api/commit/daf4ad13d41c9579dbf13d9ed04fec772da2c88e))
* **deps-dev:** Bump @types/express from 4.17.20 to 4.17.21 ([#603](https://github.com/UK-Export-Finance/mdm-api/issues/603)) ([dc51f58](https://github.com/UK-Export-Finance/mdm-api/commit/dc51f58720169ccf8006120207e5678460283ccb))
* **deps-dev:** Bump @types/jest from 29.5.4 to 29.5.5 ([31d98f4](https://github.com/UK-Export-Finance/mdm-api/commit/31d98f49a898d29c25efda8ae75806732381f311))
* **deps-dev:** Bump @types/jest from 29.5.4 to 29.5.5 ([#487](https://github.com/UK-Export-Finance/mdm-api/issues/487)) ([9c107c6](https://github.com/UK-Export-Finance/mdm-api/commit/9c107c6ec9669d50d5fee62c4a7bc390df60f658))
* **deps-dev:** Bump @types/jest from 29.5.5 to 29.5.6 ([#550](https://github.com/UK-Export-Finance/mdm-api/issues/550)) ([bca5ad3](https://github.com/UK-Export-Finance/mdm-api/commit/bca5ad364820505363d402dbb2650f34aab53d17))
* **deps-dev:** Bump @types/jest from 29.5.6 to 29.5.7 ([#579](https://github.com/UK-Export-Finance/mdm-api/issues/579)) ([6ea5934](https://github.com/UK-Export-Finance/mdm-api/commit/6ea59343f5f3c38fdb75e2651970cce588d21641))
* **deps-dev:** Bump @types/jest from 29.5.7 to 29.5.10 ([#613](https://github.com/UK-Export-Finance/mdm-api/issues/613)) ([0668243](https://github.com/UK-Export-Finance/mdm-api/commit/0668243903dc4f8844f51d540130549bd69dcf5e))
* **deps-dev:** Bump @types/lodash from 4.14.198 to 4.14.199 ([#508](https://github.com/UK-Export-Finance/mdm-api/issues/508)) ([be0cb77](https://github.com/UK-Export-Finance/mdm-api/commit/be0cb77b1a5b0a8b11b27b8d833ee7e7ee3bcdd7))
* **deps-dev:** Bump @types/lodash from 4.14.199 to 4.14.200 ([#555](https://github.com/UK-Export-Finance/mdm-api/issues/555)) ([dddeff6](https://github.com/UK-Export-Finance/mdm-api/commit/dddeff61384d188fa046619662548a3684e36aed))
* **deps-dev:** Bump @types/lodash from 4.14.200 to 4.14.201 ([#596](https://github.com/UK-Export-Finance/mdm-api/issues/596)) ([3bb98fa](https://github.com/UK-Export-Finance/mdm-api/commit/3bb98fa0c740b83da612381feb59306ed0b6563a))
* **deps-dev:** Bump @types/node from 20.10.1 to 20.10.4 ([#644](https://github.com/UK-Export-Finance/mdm-api/issues/644)) ([2abd426](https://github.com/UK-Export-Finance/mdm-api/commit/2abd4265a2e42e1abb50168b8259a0305bc82b64))
* **deps-dev:** Bump @types/node from 20.6.0 to 20.6.2 ([48b20a0](https://github.com/UK-Export-Finance/mdm-api/commit/48b20a0529604cb07adf83bf8d4ae046df19bef9))
* **deps-dev:** Bump @types/node from 20.6.0 to 20.6.2 ([#489](https://github.com/UK-Export-Finance/mdm-api/issues/489)) ([0aff11e](https://github.com/UK-Export-Finance/mdm-api/commit/0aff11eb17a1aa97a15a80caeb6608b585071555))
* **deps-dev:** Bump @types/node from 20.6.2 to 20.6.3 ([#493](https://github.com/UK-Export-Finance/mdm-api/issues/493)) ([4e30030](https://github.com/UK-Export-Finance/mdm-api/commit/4e3003054514daa99dd3f4b5c8a58da60237f4ae))
* **deps-dev:** Bump @types/node from 20.6.3 to 20.6.5 ([#497](https://github.com/UK-Export-Finance/mdm-api/issues/497)) ([ccee57c](https://github.com/UK-Export-Finance/mdm-api/commit/ccee57c51b7fd612ea4183f54887454f3dea3514))
* **deps-dev:** Bump @types/node from 20.6.5 to 20.7.0 ([#503](https://github.com/UK-Export-Finance/mdm-api/issues/503)) ([4e43067](https://github.com/UK-Export-Finance/mdm-api/commit/4e430679d39f55e27ae5a0730ba04ac68ab6e6ca))
* **deps-dev:** Bump @types/node from 20.7.0 to 20.7.1 ([#507](https://github.com/UK-Export-Finance/mdm-api/issues/507)) ([e897266](https://github.com/UK-Export-Finance/mdm-api/commit/e89726675996ef06418199ddb843989af3d283c6))
* **deps-dev:** Bump @types/node from 20.8.0 to 20.8.2 ([#518](https://github.com/UK-Export-Finance/mdm-api/issues/518)) ([62aba46](https://github.com/UK-Export-Finance/mdm-api/commit/62aba46b5eda914957be63c93ab53c1908b35f2e))
* **deps-dev:** Bump @types/node from 20.8.10 to 20.10.0 ([#615](https://github.com/UK-Export-Finance/mdm-api/issues/615)) ([0b37727](https://github.com/UK-Export-Finance/mdm-api/commit/0b377277d975cc44169bfd2707dda1be90301e48))
* **deps-dev:** Bump @types/node from 20.8.2 to 20.8.3 ([#531](https://github.com/UK-Export-Finance/mdm-api/issues/531)) ([01a5c08](https://github.com/UK-Export-Finance/mdm-api/commit/01a5c08eeab9a9991433a1eb6e5f3e524089d8fb))
* **deps-dev:** Bump @types/node from 20.8.3 to 20.8.4 ([#535](https://github.com/UK-Export-Finance/mdm-api/issues/535)) ([3ea5524](https://github.com/UK-Export-Finance/mdm-api/commit/3ea5524be032456dd772cb539e62cb9830f36200))
* **deps-dev:** Bump @types/node from 20.8.4 to 20.8.5 ([#538](https://github.com/UK-Export-Finance/mdm-api/issues/538)) ([3ff869d](https://github.com/UK-Export-Finance/mdm-api/commit/3ff869ddcc2b60a523476197b3a7b31eeeef3335))
* **deps-dev:** Bump @types/node from 20.8.5 to 20.8.6 ([#542](https://github.com/UK-Export-Finance/mdm-api/issues/542)) ([8e16291](https://github.com/UK-Export-Finance/mdm-api/commit/8e1629173c8f3000b1733c9202f9ffacac86d791))
* **deps-dev:** Bump @types/node from 20.8.6 to 20.8.7 ([#556](https://github.com/UK-Export-Finance/mdm-api/issues/556)) ([96582de](https://github.com/UK-Export-Finance/mdm-api/commit/96582ded5e1028f879abaa33b39e3cd86a87fab1))
* **deps-dev:** Bump @types/node from 20.8.7 to 20.8.9 ([#572](https://github.com/UK-Export-Finance/mdm-api/issues/572)) ([b67f6fd](https://github.com/UK-Export-Finance/mdm-api/commit/b67f6fdb67b1341944cff65dbea71e0505e57e06))
* **deps-dev:** Bump @types/node from 20.8.9 to 20.8.10 ([#587](https://github.com/UK-Export-Finance/mdm-api/issues/587)) ([44a15bb](https://github.com/UK-Export-Finance/mdm-api/commit/44a15bb753b8a71f2bcf1658da2f30514e8703a3))
* **deps-dev:** Bump @types/supertest from 2.0.12 to 2.0.13 ([#505](https://github.com/UK-Export-Finance/mdm-api/issues/505)) ([1832a64](https://github.com/UK-Export-Finance/mdm-api/commit/1832a643a299633511d6b98e5753952ba9bf7e7a))
* **deps-dev:** Bump @types/supertest from 2.0.13 to 2.0.14 ([#520](https://github.com/UK-Export-Finance/mdm-api/issues/520)) ([38abe81](https://github.com/UK-Export-Finance/mdm-api/commit/38abe81450d755cc0ea626d20efba4c72ca14539))
* **deps-dev:** Bump @types/supertest from 2.0.14 to 2.0.15 ([#554](https://github.com/UK-Export-Finance/mdm-api/issues/554)) ([6937dcf](https://github.com/UK-Export-Finance/mdm-api/commit/6937dcf74d9efe155419daba6963cb3789b1cd86))
* **deps-dev:** Bump @types/supertest from 2.0.15 to 2.0.16 ([#600](https://github.com/UK-Export-Finance/mdm-api/issues/600)) ([ef3bd4f](https://github.com/UK-Export-Finance/mdm-api/commit/ef3bd4f819dbeb40188320faf1a175087a1454ea))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.7.0 to 6.7.2 ([#490](https://github.com/UK-Export-Finance/mdm-api/issues/490)) ([9083c34](https://github.com/UK-Export-Finance/mdm-api/commit/9083c344a7c514a8794fe8cda70b35f8636e6bac))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.7.2 to 6.7.3 ([#509](https://github.com/UK-Export-Finance/mdm-api/issues/509)) ([f5b98b9](https://github.com/UK-Export-Finance/mdm-api/commit/f5b98b950d4ea03dc7950564f3e4da2e53f517ad))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.7.3 to 6.7.4 ([#519](https://github.com/UK-Export-Finance/mdm-api/issues/519)) ([0a7a299](https://github.com/UK-Export-Finance/mdm-api/commit/0a7a299cdb80d0a056a43a995a56459ad5ee579a))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.7.4 to 6.7.5 ([#534](https://github.com/UK-Export-Finance/mdm-api/issues/534)) ([d019e2f](https://github.com/UK-Export-Finance/mdm-api/commit/d019e2f41f30ae47a32ae79cbac0703d64dc32da))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.8.0 ([#548](https://github.com/UK-Export-Finance/mdm-api/issues/548)) ([0edb6ce](https://github.com/UK-Export-Finance/mdm-api/commit/0edb6ceb626781071524d60d08c355e4b51958f6))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.8.0 to 6.9.0 ([#564](https://github.com/UK-Export-Finance/mdm-api/issues/564)) ([7a1c3ca](https://github.com/UK-Export-Finance/mdm-api/commit/7a1c3ca557fd0cb3260736d865e9c92ceb2da0e1))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.9.0 to 6.9.1 ([#582](https://github.com/UK-Export-Finance/mdm-api/issues/582)) ([192c0b1](https://github.com/UK-Export-Finance/mdm-api/commit/192c0b10ade8e0be434bd2aad0b592be7a6b732b))
* **deps-dev:** Bump @typescript-eslint/parser from 6.10.0 to 6.13.1 ([#622](https://github.com/UK-Export-Finance/mdm-api/issues/622)) ([524fc85](https://github.com/UK-Export-Finance/mdm-api/commit/524fc8547a2b1492bf4a7d337455057fd4172ef9))
* **deps-dev:** Bump @typescript-eslint/parser from 6.7.0 to 6.7.2 ([#491](https://github.com/UK-Export-Finance/mdm-api/issues/491)) ([0f9310e](https://github.com/UK-Export-Finance/mdm-api/commit/0f9310eb2cc2303bc7a7ee236c95a95207991beb))
* **deps-dev:** Bump @typescript-eslint/parser from 6.7.2 to 6.7.3 ([#504](https://github.com/UK-Export-Finance/mdm-api/issues/504)) ([04365c9](https://github.com/UK-Export-Finance/mdm-api/commit/04365c9fb2dc5e94a19ddfcb8622916160cd1113))
* **deps-dev:** Bump @typescript-eslint/parser from 6.7.3 to 6.7.4 ([#521](https://github.com/UK-Export-Finance/mdm-api/issues/521)) ([4bdc551](https://github.com/UK-Export-Finance/mdm-api/commit/4bdc551ba4956bc356ff478e5282eff853248c7a))
* **deps-dev:** Bump @typescript-eslint/parser from 6.7.4 to 6.7.5 ([#533](https://github.com/UK-Export-Finance/mdm-api/issues/533)) ([4f6c6ef](https://github.com/UK-Export-Finance/mdm-api/commit/4f6c6ef43c555786bc60dea683cf5a7a96740921))
* **deps-dev:** Bump @typescript-eslint/parser from 6.7.5 to 6.8.0 ([#547](https://github.com/UK-Export-Finance/mdm-api/issues/547)) ([6abc303](https://github.com/UK-Export-Finance/mdm-api/commit/6abc303b5933cb70c311c87a4308d823454f246a))
* **deps-dev:** Bump @typescript-eslint/parser from 6.8.0 to 6.9.0 ([#569](https://github.com/UK-Export-Finance/mdm-api/issues/569)) ([b845015](https://github.com/UK-Export-Finance/mdm-api/commit/b8450157219ec8f004776d46d79808f920754bbd))
* **deps-dev:** Bump @typescript-eslint/parser from 6.9.0 to 6.9.1 ([#586](https://github.com/UK-Export-Finance/mdm-api/issues/586)) ([8a55afa](https://github.com/UK-Export-Finance/mdm-api/commit/8a55afab97e2c710738f8454711899564a89b0fa))
* **deps-dev:** Bump @typescript-eslint/parser from 6.9.1 to 6.10.0 ([#594](https://github.com/UK-Export-Finance/mdm-api/issues/594)) ([97e5d2e](https://github.com/UK-Export-Finance/mdm-api/commit/97e5d2eddb5c3910ac8dcd6c36bb0812cb9d74d2))
* **deps-dev:** Bump cspell from 7.3.7 to 7.3.8 ([#541](https://github.com/UK-Export-Finance/mdm-api/issues/541)) ([deab255](https://github.com/UK-Export-Finance/mdm-api/commit/deab2552b0a5b3adca71ae1407ea0875d0091912))
* **deps-dev:** Bump cspell from 7.3.8 to 8.0.0 ([#599](https://github.com/UK-Export-Finance/mdm-api/issues/599)) ([4775e64](https://github.com/UK-Export-Finance/mdm-api/commit/4775e644044380894b1a444c5d055cae8267dd9a))
* **deps-dev:** Bump eslint from 8.49.0 to 8.50.0 ([#502](https://github.com/UK-Export-Finance/mdm-api/issues/502)) ([6db0e92](https://github.com/UK-Export-Finance/mdm-api/commit/6db0e9217e40570314fbdd8c4d951ad871da33c3))
* **deps-dev:** Bump eslint from 8.50.0 to 8.51.0 ([#529](https://github.com/UK-Export-Finance/mdm-api/issues/529)) ([066604c](https://github.com/UK-Export-Finance/mdm-api/commit/066604c12e5b2a50489b7d460d4e246b43aa4176))
* **deps-dev:** Bump eslint from 8.52.0 to 8.53.0 ([#593](https://github.com/UK-Export-Finance/mdm-api/issues/593)) ([90346a8](https://github.com/UK-Export-Finance/mdm-api/commit/90346a89b6b73dc99d4f2d60ffb39d5ad973d7bb))
* **deps-dev:** Bump eslint-import-resolver-typescript from 3.6.0 to 3.6.1 ([#500](https://github.com/UK-Export-Finance/mdm-api/issues/500)) ([71e1cbc](https://github.com/UK-Export-Finance/mdm-api/commit/71e1cbc9d66d6ea4f397057740060c0024abc554))
* **deps-dev:** Bump eslint-plugin-deprecation from 1.5.0 to 2.0.0 ([#483](https://github.com/UK-Export-Finance/mdm-api/issues/483)) ([bad73f7](https://github.com/UK-Export-Finance/mdm-api/commit/bad73f732b947d9f5775559bdfb9c3613d56932c))
* **deps-dev:** Bump eslint-plugin-import from 2.28.1 to 2.29.0 ([#563](https://github.com/UK-Export-Finance/mdm-api/issues/563)) ([8fb24c8](https://github.com/UK-Export-Finance/mdm-api/commit/8fb24c87e6c145423824554115cac530ecd66bb7))
* **deps-dev:** Bump eslint-plugin-jest from 27.2.3 to 27.4.0 ([455f85a](https://github.com/UK-Export-Finance/mdm-api/commit/455f85a19d1af6f3b3511b6e9c152a1265524ffb))
* **deps-dev:** Bump eslint-plugin-jest from 27.2.3 to 27.4.0 ([#486](https://github.com/UK-Export-Finance/mdm-api/issues/486)) ([9c38d21](https://github.com/UK-Export-Finance/mdm-api/commit/9c38d21829453db150b2a53f05ec0e3307ad0d5b))
* **deps-dev:** Bump eslint-plugin-jest from 27.4.3 to 27.6.0 ([#574](https://github.com/UK-Export-Finance/mdm-api/issues/574)) ([e54a8b4](https://github.com/UK-Export-Finance/mdm-api/commit/e54a8b47d25acb29ce5a2dba19cdd06e1efdbba0))
* **deps-dev:** Bump eslint-plugin-prettier from 5.0.0 to 5.0.1 ([#536](https://github.com/UK-Export-Finance/mdm-api/issues/536)) ([00dd183](https://github.com/UK-Export-Finance/mdm-api/commit/00dd183ed62158fc7ab94b4888b14b7c5e321234))
* **deps-dev:** Bump lint-staged from 14.0.1 to 15.0.1 ([#544](https://github.com/UK-Export-Finance/mdm-api/issues/544)) ([bde1af7](https://github.com/UK-Export-Finance/mdm-api/commit/bde1af7d050071b5ce223b614984d7e6706cbfdb))
* **deps-dev:** Bump lint-staged from 15.0.1 to 15.0.2 ([#560](https://github.com/UK-Export-Finance/mdm-api/issues/560)) ([6db7516](https://github.com/UK-Export-Finance/mdm-api/commit/6db7516294552c9334892096392cdc808fcff1f1))
* **deps-dev:** Bump nock from 13.3.3 to 13.3.4 ([#539](https://github.com/UK-Export-Finance/mdm-api/issues/539)) ([db13d74](https://github.com/UK-Export-Finance/mdm-api/commit/db13d74e7baf83976abf9cbc41cef1d5b982236c))
* **deps-dev:** Bump nock from 13.3.4 to 13.3.6 ([#559](https://github.com/UK-Export-Finance/mdm-api/issues/559)) ([aa653bb](https://github.com/UK-Export-Finance/mdm-api/commit/aa653bbaa2db50aee509f22d61e272c42a3bbfba))
* **deps-dev:** Bump nock from 13.3.6 to 13.3.8 ([#589](https://github.com/UK-Export-Finance/mdm-api/issues/589)) ([4e0d2b7](https://github.com/UK-Export-Finance/mdm-api/commit/4e0d2b794ef4cdc2cb45df411720f9eea98b3632))
* **deps-dev:** Bump prettier from 3.0.3 to 3.1.0 ([#602](https://github.com/UK-Export-Finance/mdm-api/issues/602)) ([5fd44b2](https://github.com/UK-Export-Finance/mdm-api/commit/5fd44b245facbe533d27b5da8d82557e75c5180c))
* **deps-dev:** Bump ts-loader from 9.4.4 to 9.5.0 ([#530](https://github.com/UK-Export-Finance/mdm-api/issues/530)) ([8033233](https://github.com/UK-Export-Finance/mdm-api/commit/8033233db5a4e6af138c23187bf34c4e0b5b21b1))
* **deps-dev:** Bump ts-loader from 9.5.0 to 9.5.1 ([#620](https://github.com/UK-Export-Finance/mdm-api/issues/620)) ([aa3a85c](https://github.com/UK-Export-Finance/mdm-api/commit/aa3a85c4c3ecd4aa42d1e7514b9224fc49131a2f))
* **deps:** Bump @nestjs/axios from 3.0.0 to 3.0.1 ([#581](https://github.com/UK-Export-Finance/mdm-api/issues/581)) ([ccb9c1c](https://github.com/UK-Export-Finance/mdm-api/commit/ccb9c1ce9541cc3c43a9e9ab75f1e9ad0e5addb9))
* **deps:** Bump @nestjs/common from 10.2.5 to 10.2.6 ([#506](https://github.com/UK-Export-Finance/mdm-api/issues/506)) ([d4d0099](https://github.com/UK-Export-Finance/mdm-api/commit/d4d00994b1426476a23fa8ca2c68f11f44d7e254))
* **deps:** Bump @nestjs/common from 10.2.6 to 10.2.7 ([#526](https://github.com/UK-Export-Finance/mdm-api/issues/526)) ([2e49610](https://github.com/UK-Export-Finance/mdm-api/commit/2e49610c2c79719a88ca9302bbe31d5d295d9e09))
* **deps:** Bump @nestjs/common from 10.2.7 to 10.2.8 ([#592](https://github.com/UK-Export-Finance/mdm-api/issues/592)) ([1adf779](https://github.com/UK-Export-Finance/mdm-api/commit/1adf779fb84f34de6179a13ee5bd0dd44ab9a114))
* **deps:** Bump @nestjs/core from 10.2.6 to 10.2.7 ([#525](https://github.com/UK-Export-Finance/mdm-api/issues/525)) ([8c0433d](https://github.com/UK-Export-Finance/mdm-api/commit/8c0433d13a960a38054653cb19fd774b67a0d29f))
* **deps:** Bump @nestjs/core from 10.2.7 to 10.2.8 ([#590](https://github.com/UK-Export-Finance/mdm-api/issues/590)) ([0f32e12](https://github.com/UK-Export-Finance/mdm-api/commit/0f32e12f0f58db003f4f25033233ad7355420d14))
* **deps:** Bump @nestjs/platform-express from 10.2.5 to 10.2.6 ([#498](https://github.com/UK-Export-Finance/mdm-api/issues/498)) ([fd0907e](https://github.com/UK-Export-Finance/mdm-api/commit/fd0907e45041c034ec8cd7d0af8c3707e566fe2a))
* **deps:** Bump @nestjs/platform-express from 10.2.6 to 10.2.7 ([#527](https://github.com/UK-Export-Finance/mdm-api/issues/527)) ([5d6a2d7](https://github.com/UK-Export-Finance/mdm-api/commit/5d6a2d73447e4dd20efa1b952c4f20b20c84101a))
* **deps:** Bump @nestjs/platform-express from 10.2.7 to 10.2.8 ([#591](https://github.com/UK-Export-Finance/mdm-api/issues/591)) ([7fc7571](https://github.com/UK-Export-Finance/mdm-api/commit/7fc7571e316b19c4cd18c18e091e948812c9e6ea))
* **deps:** Bump @nestjs/swagger from 7.1.11 to 7.1.12 ([#496](https://github.com/UK-Export-Finance/mdm-api/issues/496)) ([45fed33](https://github.com/UK-Export-Finance/mdm-api/commit/45fed33628ba958274506fdfb51437ef8c4dc9ae))
* **deps:** Bump @nestjs/swagger from 7.1.12 to 7.1.13 ([#523](https://github.com/UK-Export-Finance/mdm-api/issues/523)) ([429de1e](https://github.com/UK-Export-Finance/mdm-api/commit/429de1ebb8a2445cced7413e1ef51af9f2569638))
* **deps:** Bump @nestjs/swagger from 7.1.13 to 7.1.14 ([#567](https://github.com/UK-Export-Finance/mdm-api/issues/567)) ([446a7e3](https://github.com/UK-Export-Finance/mdm-api/commit/446a7e3281371dd4850c01661d614a3a79db3c29))
* **deps:** Bump @nestjs/swagger from 7.1.14 to 7.1.15 ([#597](https://github.com/UK-Export-Finance/mdm-api/issues/597)) ([61314e2](https://github.com/UK-Export-Finance/mdm-api/commit/61314e2db9dc81462a2c19c02d20923966e9f790))
* **deps:** Bump @nestjs/terminus from 10.0.1 to 10.1.1 ([#484](https://github.com/UK-Export-Finance/mdm-api/issues/484)) ([ec554a2](https://github.com/UK-Export-Finance/mdm-api/commit/ec554a293f55c5b290141e552af7159996ae0788))
* **deps:** Bump @nestjs/typeorm from 10.0.0 to 10.0.1 ([#617](https://github.com/UK-Export-Finance/mdm-api/issues/617)) ([b8642b5](https://github.com/UK-Export-Finance/mdm-api/commit/b8642b527bc2c6e344c0df92dd022f101773cfed))
* **deps:** Bump axios from 1.5.0 to 1.5.1 ([#510](https://github.com/UK-Export-Finance/mdm-api/issues/510)) ([46ce219](https://github.com/UK-Export-Finance/mdm-api/commit/46ce219fc971e2e25669bcd3712edc0dc54caa58))
* **deps:** Bump axios from 1.5.1 to 1.6.0 ([#576](https://github.com/UK-Export-Finance/mdm-api/issues/576)) ([251e470](https://github.com/UK-Export-Finance/mdm-api/commit/251e470ba51fc4db56fcf3016ebb04438e56c2a4))
* **deps:** Bump axios from 1.6.0 to 1.6.1 ([#598](https://github.com/UK-Export-Finance/mdm-api/issues/598)) ([b44308f](https://github.com/UK-Export-Finance/mdm-api/commit/b44308f8d49fb0f54962ecf03f9bfbe464ff3d50))
* **deps:** Bump axios from 1.6.1 to 1.6.2 ([#619](https://github.com/UK-Export-Finance/mdm-api/issues/619)) ([69aff70](https://github.com/UK-Export-Finance/mdm-api/commit/69aff70e2169af4be74228ac517040d658b7481e))
* **deps:** Bump nestjs-pino from 3.4.0 to 3.5.0 ([#495](https://github.com/UK-Export-Finance/mdm-api/issues/495)) ([881363c](https://github.com/UK-Export-Finance/mdm-api/commit/881363cd2373c08dc98bf3fde909baee7aeb1685))
* **deps:** Bump node from 20.8.1-alpine3.17 to 21.0.0-alpine3.17 ([#558](https://github.com/UK-Export-Finance/mdm-api/issues/558)) ([1090fc8](https://github.com/UK-Export-Finance/mdm-api/commit/1090fc878246899027258a7232d04b78c600610d))
* **deps:** Bump node from 21.1.0-alpine3.17 to 21.2.0-alpine3.17 ([#606](https://github.com/UK-Export-Finance/mdm-api/issues/606)) ([c2ef738](https://github.com/UK-Export-Finance/mdm-api/commit/c2ef7384fec7a917851ed39f789b5c4faf9bb196))
* **deps:** Bump node from 21.2.0-alpine3.17 to 21.4.0-alpine3.17 ([#642](https://github.com/UK-Export-Finance/mdm-api/issues/642)) ([76eb82a](https://github.com/UK-Export-Finance/mdm-api/commit/76eb82aa4b019d8e5cb9c499fa59e744dc8f6999))
* **deps:** Bump pino-http from 8.5.0 to 8.5.1 ([#577](https://github.com/UK-Export-Finance/mdm-api/issues/577)) ([6c14ce2](https://github.com/UK-Export-Finance/mdm-api/commit/6c14ce2da3a361254eb018ad965fa8f90fe60f26))
* **deps:** Bump pino-pretty from 10.2.0 to 10.2.2 ([#522](https://github.com/UK-Export-Finance/mdm-api/issues/522)) ([3b11cdd](https://github.com/UK-Export-Finance/mdm-api/commit/3b11cddb1817457c02e219e7e8cd175d06f4e385))
* **deps:** Bump pino-pretty from 10.2.2 to 10.2.3 ([#524](https://github.com/UK-Export-Finance/mdm-api/issues/524)) ([b659e67](https://github.com/UK-Export-Finance/mdm-api/commit/b659e678b2d578c7f8467444a4dbfbfcd65fd8c5))
* **deps:** Bump typeorm-extension from 3.0.1 to 3.0.2 ([30635de](https://github.com/UK-Export-Finance/mdm-api/commit/30635de3e354ced42eafb4b338e313413b946366))
* **deps:** Bump typeorm-extension from 3.0.1 to 3.0.2 ([#488](https://github.com/UK-Export-Finance/mdm-api/issues/488)) ([62a5bd9](https://github.com/UK-Export-Finance/mdm-api/commit/62a5bd997decbc40c71cc4636af0b05ade8b0874))
* **deps:** Bump typeorm-extension from 3.1.0 to 3.1.1 ([#575](https://github.com/UK-Export-Finance/mdm-api/issues/575)) ([8700c40](https://github.com/UK-Export-Finance/mdm-api/commit/8700c407255e7cae07761332b54c80dc9fa9e8d6))
* **deps:** dependencies updates ([e9ed904](https://github.com/UK-Export-Finance/mdm-api/commit/e9ed904b5552df4b50eae0f8a580be7bbb2c9f37))
* **deps:** update actions/setup-node action to v4 ([#565](https://github.com/UK-Export-Finance/mdm-api/issues/565)) ([a57ba29](https://github.com/UK-Export-Finance/mdm-api/commit/a57ba29235a98bfaf0d56f8cec9b3bf3c228e944))
* **deps:** update all ([#492](https://github.com/UK-Export-Finance/mdm-api/issues/492)) ([cf29a7c](https://github.com/UK-Export-Finance/mdm-api/commit/cf29a7c9fee386cc05c2d9a1bbe8c2a0d8724ec2))
* **deps:** update all ([#513](https://github.com/UK-Export-Finance/mdm-api/issues/513)) ([76b710d](https://github.com/UK-Export-Finance/mdm-api/commit/76b710d8ada34c67efea8d435c16351ad41940c4))
* **deps:** update commitlint monorepo to v18 (major) ([#562](https://github.com/UK-Export-Finance/mdm-api/issues/562)) ([b9db561](https://github.com/UK-Export-Finance/mdm-api/commit/b9db5614978ed503e0286a9b5e6613572c81e195))
* **deps:** update node.js to v20.8.1 ([#546](https://github.com/UK-Export-Finance/mdm-api/issues/546)) ([8f012d5](https://github.com/UK-Export-Finance/mdm-api/commit/8f012d50e7426be41f29aa3dacafdc87b15c1a43))
* **deps:** update node.js to v21 ([#557](https://github.com/UK-Export-Finance/mdm-api/issues/557)) ([7e8d0dc](https://github.com/UK-Export-Finance/mdm-api/commit/7e8d0dc40503e039ccdbf8b4cab1afd8e9480dd6))

## [1.16.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.15.1...v1.16.0) (2023-09-13)


### Features

* **APIM-344:** fix 2 PR feedback items, change comment and var type ([da02c07](https://github.com/UK-Export-Finance/mdm-api/commit/da02c071096e7c1ba07bc90b9e1b06a77829357e))
* **APIM-344:** handle sensitive details in log messages ([#324](https://github.com/UK-Export-Finance/mdm-api/issues/324)) ([2e5a948](https://github.com/UK-Export-Finance/mdm-api/commit/2e5a948fccee916518bc5e2c07c267071966bf30))
* **APIM-468:** change how integer config values are parsed ([94dffdd](https://github.com/UK-Export-Finance/mdm-api/commit/94dffdd43b93549b1e549d2935d93aecbba67e12))
* **APIM-468:** change how integer config values are parsed ([#357](https://github.com/UK-Export-Finance/mdm-api/issues/357)) ([ee24d08](https://github.com/UK-Export-Finance/mdm-api/commit/ee24d08bcf636ec2c118dd7ce30f55e9de411f58))
* **APIM-468:** copying missed unit test for get-int-config helper ([9a2a452](https://github.com/UK-Export-Finance/mdm-api/commit/9a2a4522602e0b1d9ce42b0a7eeef544c3f74157))
* **APIM-468:** merge main branch ([2ec2c5f](https://github.com/UK-Export-Finance/mdm-api/commit/2ec2c5f800b356aea6df9f64c186edf87a87b0ca))
* **APIM-468:** removed undefined return var type ([835b65f](https://github.com/UK-Export-Finance/mdm-api/commit/835b65fd9ec6bf0450afdfca62345b97a2a9adbe))
* **APIM-468:** renaming section in unit test ([1b5cfe3](https://github.com/UK-Export-Finance/mdm-api/commit/1b5cfe361914ed4c72af053c40c424c56caba3a8))
* **apim-538:** add environment variable for log format ([#337](https://github.com/UK-Export-Finance/mdm-api/issues/337)) ([fc54db2](https://github.com/UK-Export-Finance/mdm-api/commit/fc54db25340f8ac2c5838c8c710d5946e834da36))
* **APIM-538:** update single line log format env var ([#365](https://github.com/UK-Export-Finance/mdm-api/issues/365)) ([957c95a](https://github.com/UK-Export-Finance/mdm-api/commit/957c95ad5c88485cb064100624d89d9631a42705))
* **APIM-582:** remove unused endpoint GET /constants/spi ([04cac62](https://github.com/UK-Export-Finance/mdm-api/commit/04cac627359f1611a3a8ffa82b2f70edc368a8b9))
* **APIM-582:** remove unused endpoint GET /constants/spi ([#427](https://github.com/UK-Export-Finance/mdm-api/issues/427)) ([b431841](https://github.com/UK-Export-Finance/mdm-api/commit/b431841c65c5b181cbf5a1d1b05a9fe5c4683264))


### Bug Fixes

* **deps:** update all ([#396](https://github.com/UK-Export-Finance/mdm-api/issues/396)) ([f851b7b](https://github.com/UK-Export-Finance/mdm-api/commit/f851b7b87dbd04bf8f3178ac52d1a06d0849f024))
* **deps:** update all ([#461](https://github.com/UK-Export-Finance/mdm-api/issues/461)) ([6bf386c](https://github.com/UK-Export-Finance/mdm-api/commit/6bf386cb43883aa78c9aa89886da45c5a6d43f77))
* **deps:** update all ([#469](https://github.com/UK-Export-Finance/mdm-api/issues/469)) ([096b68b](https://github.com/UK-Export-Finance/mdm-api/commit/096b68b88e569fa9e2d0d5fa333ce03b7d99a73b))
* **deps:** update dependency mssql to v10 ([#463](https://github.com/UK-Export-Finance/mdm-api/issues/463)) ([993410d](https://github.com/UK-Export-Finance/mdm-api/commit/993410d6c5d151640eb774e302cc3827999bbf10))
* **gitignore:** environment variable introduction ([#364](https://github.com/UK-Export-Finance/mdm-api/issues/364)) ([3336d22](https://github.com/UK-Export-Finance/mdm-api/commit/3336d220d7823b1f27620c37ab353e0cf6e6384f))
* **premium-schedule:** added 0 and 4 as acceptable inputs ([#440](https://github.com/UK-Export-Finance/mdm-api/issues/440)) ([270b405](https://github.com/UK-Export-Finance/mdm-api/commit/270b4057fa292a2e39fe3d2cd4910d85a10990fc))


### Miscellaneous

* **deps-dev:** Bump @commitlint/cli from 17.6.7 to 17.7.1 ([#405](https://github.com/UK-Export-Finance/mdm-api/issues/405)) ([3f5d3e6](https://github.com/UK-Export-Finance/mdm-api/commit/3f5d3e690035e87ea03b8253101692d4f187dc87))
* **deps-dev:** Bump @commitlint/config-conventional from 17.6.7 to 17.7.0 ([#404](https://github.com/UK-Export-Finance/mdm-api/issues/404)) ([febf7c3](https://github.com/UK-Export-Finance/mdm-api/commit/febf7c3785e23e432e41e82afcf3754c5bbe34be))
* **deps-dev:** Bump @nestjs/cli from 10.1.10 to 10.1.11 ([#369](https://github.com/UK-Export-Finance/mdm-api/issues/369)) ([1792ce5](https://github.com/UK-Export-Finance/mdm-api/commit/1792ce525f91314ea135be48ff64993b2ea9383a))
* **deps-dev:** Bump @nestjs/cli from 10.1.11 to 10.1.12 ([#413](https://github.com/UK-Export-Finance/mdm-api/issues/413)) ([167f0d3](https://github.com/UK-Export-Finance/mdm-api/commit/167f0d327e67ba54a5c97de35c8d0dd7186e634d))
* **deps-dev:** Bump @nestjs/cli from 10.1.12 to 10.1.14 ([#425](https://github.com/UK-Export-Finance/mdm-api/issues/425)) ([7671347](https://github.com/UK-Export-Finance/mdm-api/commit/76713471180faeeecbea77c92fd67d202a40aa63))
* **deps-dev:** Bump @nestjs/cli from 10.1.14 to 10.1.16 ([#430](https://github.com/UK-Export-Finance/mdm-api/issues/430)) ([dbd452e](https://github.com/UK-Export-Finance/mdm-api/commit/dbd452ec5a55749a584efc0e44d7ef4808c7fce9))
* **deps-dev:** Bump @nestjs/cli from 10.1.16 to 10.1.17 ([#447](https://github.com/UK-Export-Finance/mdm-api/issues/447)) ([e3deb06](https://github.com/UK-Export-Finance/mdm-api/commit/e3deb068c569638cb0b550b4f775abf60bb5dc33))
* **deps-dev:** Bump @nestjs/schematics from 10.0.1 to 10.0.2 ([#386](https://github.com/UK-Export-Finance/mdm-api/issues/386)) ([63b1159](https://github.com/UK-Export-Finance/mdm-api/commit/63b1159799499acd8a0384ddc125bb0ffded9836))
* **deps-dev:** Bump @nestjs/testing from 10.1.2 to 10.1.3 ([#372](https://github.com/UK-Export-Finance/mdm-api/issues/372)) ([1b3f110](https://github.com/UK-Export-Finance/mdm-api/commit/1b3f110f74e8c000786c9e06d0c71ba5441a4245))
* **deps-dev:** Bump @nestjs/testing from 10.2.1 to 10.2.4 ([#448](https://github.com/UK-Export-Finance/mdm-api/issues/448)) ([fa76b1c](https://github.com/UK-Export-Finance/mdm-api/commit/fa76b1c7e453a5100818f9b4207808a0cde71e27))
* **deps-dev:** Bump @nestjs/testing from 10.2.4 to 10.2.5 ([#474](https://github.com/UK-Export-Finance/mdm-api/issues/474)) ([cee7bba](https://github.com/UK-Export-Finance/mdm-api/commit/cee7bba58fa9e7775d00a06feab716b1b2779444))
* **deps-dev:** Bump @tsconfig/node20 from 20.1.0 to 20.1.1 ([#394](https://github.com/UK-Export-Finance/mdm-api/issues/394)) ([adb5d6c](https://github.com/UK-Export-Finance/mdm-api/commit/adb5d6c39871846e6ec31d9d7197a9fd51fe5ebf))
* **deps-dev:** Bump @types/chance from 1.1.3 to 1.1.4 ([#462](https://github.com/UK-Export-Finance/mdm-api/issues/462)) ([4743de6](https://github.com/UK-Export-Finance/mdm-api/commit/4743de686c578e5fe8a7821a4cf7e44cf4a77c64))
* **deps-dev:** Bump @types/compression from 1.7.2 to 1.7.3 ([#456](https://github.com/UK-Export-Finance/mdm-api/issues/456)) ([941eeaf](https://github.com/UK-Export-Finance/mdm-api/commit/941eeafa11bf384b05e541d28d59a5c6bf093c6b))
* **deps-dev:** Bump @types/jest from 29.5.3 to 29.5.4 ([#424](https://github.com/UK-Export-Finance/mdm-api/issues/424)) ([821b24c](https://github.com/UK-Export-Finance/mdm-api/commit/821b24c08b9e87fe82276a8d6f8d26a7bc98ca55))
* **deps-dev:** Bump @types/lodash from 4.14.195 to 4.14.196 ([#355](https://github.com/UK-Export-Finance/mdm-api/issues/355)) ([e3ecc57](https://github.com/UK-Export-Finance/mdm-api/commit/e3ecc57ff56e771db322abd791e4ef7037575ae9))
* **deps-dev:** Bump @types/lodash from 4.14.196 to 4.14.197 ([#403](https://github.com/UK-Export-Finance/mdm-api/issues/403)) ([31cf10f](https://github.com/UK-Export-Finance/mdm-api/commit/31cf10fa320d61b6b4acc1151852405152f1b1a9))
* **deps-dev:** Bump @types/lodash from 4.14.197 to 4.14.198 ([#464](https://github.com/UK-Export-Finance/mdm-api/issues/464)) ([902f5a6](https://github.com/UK-Export-Finance/mdm-api/commit/902f5a6bff97874126211cdc26084058f26b8e06))
* **deps-dev:** Bump @types/node from 20.4.4 to 20.4.5 ([#356](https://github.com/UK-Export-Finance/mdm-api/issues/356)) ([9fe0511](https://github.com/UK-Export-Finance/mdm-api/commit/9fe05115a0550086d87d0b5cde7d74bad952343b))
* **deps-dev:** Bump @types/node from 20.4.5 to 20.4.6 ([#377](https://github.com/UK-Export-Finance/mdm-api/issues/377)) ([babff23](https://github.com/UK-Export-Finance/mdm-api/commit/babff23b33fe1eaa61db8987b07ce2695dc548fd))
* **deps-dev:** Bump @types/node from 20.4.6 to 20.4.7 ([#379](https://github.com/UK-Export-Finance/mdm-api/issues/379)) ([a559dc6](https://github.com/UK-Export-Finance/mdm-api/commit/a559dc656d45e5d8b5d77c17179192970499ac9e))
* **deps-dev:** Bump @types/node from 20.4.7 to 20.4.8 ([#382](https://github.com/UK-Export-Finance/mdm-api/issues/382)) ([ff81582](https://github.com/UK-Export-Finance/mdm-api/commit/ff815823006df0f63d2872fba7856c49b2eee92d))
* **deps-dev:** Bump @types/node from 20.4.8 to 20.4.9 ([#393](https://github.com/UK-Export-Finance/mdm-api/issues/393)) ([fc23dfd](https://github.com/UK-Export-Finance/mdm-api/commit/fc23dfdf21b49f2aaab914b86915c63227d63eff))
* **deps-dev:** Bump @types/node from 20.4.9 to 20.5.0 ([#406](https://github.com/UK-Export-Finance/mdm-api/issues/406)) ([da99534](https://github.com/UK-Export-Finance/mdm-api/commit/da995346f923d200441de6b86e887f410c8e085c))
* **deps-dev:** Bump @types/node from 20.5.0 to 20.5.1 ([#415](https://github.com/UK-Export-Finance/mdm-api/issues/415)) ([f61b71b](https://github.com/UK-Export-Finance/mdm-api/commit/f61b71b523358f97dd336282a7c85632880d5e1a))
* **deps-dev:** Bump @types/node from 20.5.2 to 20.5.3 ([#423](https://github.com/UK-Export-Finance/mdm-api/issues/423)) ([1cc93c7](https://github.com/UK-Export-Finance/mdm-api/commit/1cc93c7b48361e48d048984c6bf8727d6ab3f24c))
* **deps-dev:** Bump @types/node from 20.5.3 to 20.5.4 ([9ba46d0](https://github.com/UK-Export-Finance/mdm-api/commit/9ba46d03a7c3039c813863fd30c5f08fa4960981))
* **deps-dev:** Bump @types/node from 20.5.3 to 20.5.4 ([#426](https://github.com/UK-Export-Finance/mdm-api/issues/426)) ([62a8fa4](https://github.com/UK-Export-Finance/mdm-api/commit/62a8fa4e88c87a1db09f077266ee6c0fc13696e2))
* **deps-dev:** Bump @types/node from 20.5.4 to 20.5.6 ([#429](https://github.com/UK-Export-Finance/mdm-api/issues/429)) ([8dffcc4](https://github.com/UK-Export-Finance/mdm-api/commit/8dffcc40b4ba604d7ea7b4b4b72b9cea82d94d4c))
* **deps-dev:** Bump @types/node from 20.5.6 to 20.5.7 ([#432](https://github.com/UK-Export-Finance/mdm-api/issues/432)) ([a440523](https://github.com/UK-Export-Finance/mdm-api/commit/a4405230cde28544057693dfa3022fc3fa30d09b))
* **deps-dev:** Bump @types/node from 20.5.7 to 20.5.9 ([#449](https://github.com/UK-Export-Finance/mdm-api/issues/449)) ([dea29bf](https://github.com/UK-Export-Finance/mdm-api/commit/dea29bf214798696e7e183091f7f1dd4deef22f6))
* **deps-dev:** Bump @types/node from 20.5.9 to 20.6.0 ([#466](https://github.com/UK-Export-Finance/mdm-api/issues/466)) ([b42a37c](https://github.com/UK-Export-Finance/mdm-api/commit/b42a37c65e22fad67ac9f2a5a76a46baba957780))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.2.0 to 6.2.1 ([#368](https://github.com/UK-Export-Finance/mdm-api/issues/368)) ([50db98a](https://github.com/UK-Export-Finance/mdm-api/commit/50db98aebb23887426f2fdea5abfe6f3e860fe20))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.2.1 to 6.3.0 ([#392](https://github.com/UK-Export-Finance/mdm-api/issues/392)) ([8451f5f](https://github.com/UK-Export-Finance/mdm-api/commit/8451f5f3345129320a093c05c972fa704f6e8121))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.3.0 to 6.4.0 ([#409](https://github.com/UK-Export-Finance/mdm-api/issues/409)) ([876dcf3](https://github.com/UK-Export-Finance/mdm-api/commit/876dcf317a3c3a78d20f08f18ed14b76fa4c6724))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.4.0 to 6.4.1 ([#421](https://github.com/UK-Export-Finance/mdm-api/issues/421)) ([898294e](https://github.com/UK-Export-Finance/mdm-api/commit/898294e333e5e1132bb3e012a1fff70421512805))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.4.1 to 6.5.0 ([#437](https://github.com/UK-Export-Finance/mdm-api/issues/437)) ([d62f78c](https://github.com/UK-Export-Finance/mdm-api/commit/d62f78cffcbf61a19030d6ffac2c50144d28805a))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.5.0 to 6.6.0 ([#455](https://github.com/UK-Export-Finance/mdm-api/issues/455)) ([7f73aca](https://github.com/UK-Export-Finance/mdm-api/commit/7f73aca053ae7f305ccb3de892cba30f18ee4604))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.6.0 to 6.7.0 ([#475](https://github.com/UK-Export-Finance/mdm-api/issues/475)) ([570e1ec](https://github.com/UK-Export-Finance/mdm-api/commit/570e1ec50491057e017174ae2f06d2e5f0bd6101))
* **deps-dev:** Bump @typescript-eslint/parser from 6.2.0 to 6.2.1 ([#370](https://github.com/UK-Export-Finance/mdm-api/issues/370)) ([1610b5d](https://github.com/UK-Export-Finance/mdm-api/commit/1610b5d462ba8bef510eb438e93214d316031c9f))
* **deps-dev:** Bump @typescript-eslint/parser from 6.2.1 to 6.3.0 ([#387](https://github.com/UK-Export-Finance/mdm-api/issues/387)) ([c057321](https://github.com/UK-Export-Finance/mdm-api/commit/c057321ab19e38736ec3dc6e5c9dbd65ef5e49e0))
* **deps-dev:** Bump @typescript-eslint/parser from 6.3.0 to 6.4.0 ([f665ec5](https://github.com/UK-Export-Finance/mdm-api/commit/f665ec5db07d2ad50d15832dbbef09b265338f98))
* **deps-dev:** Bump @typescript-eslint/parser from 6.3.0 to 6.4.0 ([#410](https://github.com/UK-Export-Finance/mdm-api/issues/410)) ([973d1b4](https://github.com/UK-Export-Finance/mdm-api/commit/973d1b4b489b2fad1a9aacee0a3bf12e3b955946))
* **deps-dev:** Bump @typescript-eslint/parser from 6.4.0 to 6.4.1 ([#418](https://github.com/UK-Export-Finance/mdm-api/issues/418)) ([217d56e](https://github.com/UK-Export-Finance/mdm-api/commit/217d56ecc429e84d7a4533e7a92836ad81d7ac7e))
* **deps-dev:** Bump @typescript-eslint/parser from 6.4.1 to 6.5.0 ([#439](https://github.com/UK-Export-Finance/mdm-api/issues/439)) ([9709121](https://github.com/UK-Export-Finance/mdm-api/commit/97091211be8a7d890d7ac697cf496e8a87e0b05c))
* **deps-dev:** Bump @typescript-eslint/parser from 6.5.0 to 6.6.0 ([#454](https://github.com/UK-Export-Finance/mdm-api/issues/454)) ([984a6fd](https://github.com/UK-Export-Finance/mdm-api/commit/984a6fd631a6cbdfa79990a6641f01efd2d3abe3))
* **deps-dev:** Bump @typescript-eslint/parser from 6.6.0 to 6.7.0 ([#473](https://github.com/UK-Export-Finance/mdm-api/issues/473)) ([172f77a](https://github.com/UK-Export-Finance/mdm-api/commit/172f77a8631c6d556817b779760aad64adf1b5f2))
* **deps-dev:** Bump cspell from 6.31.2 to 7.0.0 ([#397](https://github.com/UK-Export-Finance/mdm-api/issues/397)) ([c2db8eb](https://github.com/UK-Export-Finance/mdm-api/commit/c2db8eb7e19303b14477b25672997d352d34746b))
* **deps-dev:** Bump cspell from 7.0.1 to 7.3.2 ([#459](https://github.com/UK-Export-Finance/mdm-api/issues/459)) ([2922746](https://github.com/UK-Export-Finance/mdm-api/commit/29227464ff2d6adaf78508749a045c95c7701c87))
* **deps-dev:** Bump cspell from 7.3.2 to 7.3.5 ([#467](https://github.com/UK-Export-Finance/mdm-api/issues/467)) ([8398e61](https://github.com/UK-Export-Finance/mdm-api/commit/8398e61eeb47286dbb484d5b004646c488143e47))
* **deps-dev:** Bump eslint from 8.45.0 to 8.46.0 ([#366](https://github.com/UK-Export-Finance/mdm-api/issues/366)) ([c458a60](https://github.com/UK-Export-Finance/mdm-api/commit/c458a60033cf53555ae79d02a94a09ec8aaa9c09))
* **deps-dev:** Bump eslint from 8.46.0 to 8.47.0 ([#407](https://github.com/UK-Export-Finance/mdm-api/issues/407)) ([27b53d2](https://github.com/UK-Export-Finance/mdm-api/commit/27b53d266c375c1c99a7d04a1391b26b300a222c))
* **deps-dev:** Bump eslint from 8.47.0 to 8.48.0 ([#434](https://github.com/UK-Export-Finance/mdm-api/issues/434)) ([e79e24b](https://github.com/UK-Export-Finance/mdm-api/commit/e79e24b87274e2d8efca60b9eb6a188aef5a4e00))
* **deps-dev:** Bump eslint from 8.48.0 to 8.49.0 ([#468](https://github.com/UK-Export-Finance/mdm-api/issues/468)) ([7fa309a](https://github.com/UK-Export-Finance/mdm-api/commit/7fa309a89b6e17923291c83bcb48466c53760b6d))
* **deps-dev:** Bump eslint-config-prettier from 8.10.0 to 9.0.0 ([#385](https://github.com/UK-Export-Finance/mdm-api/issues/385)) ([fab9006](https://github.com/UK-Export-Finance/mdm-api/commit/fab9006c2bcce65fbb0cba69d84ed6c1b83f5380))
* **deps-dev:** Bump eslint-config-prettier from 8.8.0 to 8.9.0 ([#360](https://github.com/UK-Export-Finance/mdm-api/issues/360)) ([5d670e6](https://github.com/UK-Export-Finance/mdm-api/commit/5d670e6dc1cfa942d0f5921a1a810e37cab63e0a))
* **deps-dev:** Bump eslint-config-prettier from 8.9.0 to 8.10.0 ([#378](https://github.com/UK-Export-Finance/mdm-api/issues/378)) ([e537978](https://github.com/UK-Export-Finance/mdm-api/commit/e537978246a042b0713b8a4b57a9abe0fbe67c71))
* **deps-dev:** Bump eslint-import-resolver-typescript from 3.5.5 to 3.6.0 ([#401](https://github.com/UK-Export-Finance/mdm-api/issues/401)) ([61046b6](https://github.com/UK-Export-Finance/mdm-api/commit/61046b65d1e1c9fc71efe4075fbcaf0826921c59))
* **deps-dev:** Bump eslint-plugin-deprecation from 1.4.1 to 1.5.0 ([#359](https://github.com/UK-Export-Finance/mdm-api/issues/359)) ([67b5925](https://github.com/UK-Export-Finance/mdm-api/commit/67b592563051b02d9fcf58a7abd02e1c910d96bb))
* **deps-dev:** Bump eslint-plugin-import from 2.27.5 to 2.28.0 ([#361](https://github.com/UK-Export-Finance/mdm-api/issues/361)) ([db28aba](https://github.com/UK-Export-Finance/mdm-api/commit/db28aba2729f9e3c9397c3716d963729dd5a69f1))
* **deps-dev:** Bump eslint-plugin-import from 2.28.0 to 2.28.1 ([#414](https://github.com/UK-Export-Finance/mdm-api/issues/414)) ([67cbce2](https://github.com/UK-Export-Finance/mdm-api/commit/67cbce2624c1d02a25941390dd5fb0f7b269d5a2))
* **deps-dev:** Bump jest from 29.6.1 to 29.6.2 ([#362](https://github.com/UK-Export-Finance/mdm-api/issues/362)) ([9e48aa4](https://github.com/UK-Export-Finance/mdm-api/commit/9e48aa4b7da7a311d0770a6ab25f7c7eb0c8ff28))
* **deps-dev:** Bump jest from 29.6.3 to 29.6.4 ([#428](https://github.com/UK-Export-Finance/mdm-api/issues/428)) ([c6bebe0](https://github.com/UK-Export-Finance/mdm-api/commit/c6bebe0d0a873956e157be495789dfce48fcba1a))
* **deps-dev:** Bump jest-when from 3.5.2 to 3.6.0 ([#390](https://github.com/UK-Export-Finance/mdm-api/issues/390)) ([9a681d2](https://github.com/UK-Export-Finance/mdm-api/commit/9a681d2f2c0917791aa7da045998243d4eb9c60f))
* **deps-dev:** Bump lint-staged from 13.2.3 to 14.0.0 ([#408](https://github.com/UK-Export-Finance/mdm-api/issues/408)) ([53e95e6](https://github.com/UK-Export-Finance/mdm-api/commit/53e95e6208f8986d874d3e004d47e276dc791db0))
* **deps-dev:** Bump nock from 13.3.2 to 13.3.3 ([#412](https://github.com/UK-Export-Finance/mdm-api/issues/412)) ([68691b8](https://github.com/UK-Export-Finance/mdm-api/commit/68691b851f0ab4d9493a61846050342c291d6de7))
* **deps-dev:** Bump prettier from 3.0.0 to 3.0.1 ([#376](https://github.com/UK-Export-Finance/mdm-api/issues/376)) ([18ca5f3](https://github.com/UK-Export-Finance/mdm-api/commit/18ca5f3a539bd15cea582e6b799699de70f69996))
* **deps-dev:** Bump prettier from 3.0.1 to 3.0.2 ([a49e2d8](https://github.com/UK-Export-Finance/mdm-api/commit/a49e2d8e0b9c8272e99c2209de60158daff6c99f))
* **deps-dev:** Bump prettier from 3.0.1 to 3.0.2 ([#411](https://github.com/UK-Export-Finance/mdm-api/issues/411)) ([0db0852](https://github.com/UK-Export-Finance/mdm-api/commit/0db0852837822ed9adcbfb4758cc4b44719b6aa6))
* **deps-dev:** Bump prettier from 3.0.2 to 3.0.3 ([#453](https://github.com/UK-Export-Finance/mdm-api/issues/453)) ([3604468](https://github.com/UK-Export-Finance/mdm-api/commit/3604468878372579bb1e4b1618a35661e4aa4737))
* **deps:** Bump @nestjs/common from 10.1.2 to 10.1.3 ([#374](https://github.com/UK-Export-Finance/mdm-api/issues/374)) ([1e894ec](https://github.com/UK-Export-Finance/mdm-api/commit/1e894ec0028b566505d9ff24d34336c2ff534848))
* **deps:** Bump @nestjs/common from 10.1.3 to 10.2.1 ([#420](https://github.com/UK-Export-Finance/mdm-api/issues/420)) ([04a3c57](https://github.com/UK-Export-Finance/mdm-api/commit/04a3c570823705ce6e2fa982d9aadca5b282d236))
* **deps:** Bump @nestjs/common from 10.2.1 to 10.2.4 ([#445](https://github.com/UK-Export-Finance/mdm-api/issues/445)) ([ba25c47](https://github.com/UK-Export-Finance/mdm-api/commit/ba25c475c07e0c63dd00f93f4840407463690da1))
* **deps:** Bump @nestjs/common from 10.2.4 to 10.2.5 ([#472](https://github.com/UK-Export-Finance/mdm-api/issues/472)) ([d348287](https://github.com/UK-Export-Finance/mdm-api/commit/d348287b90db80a91995cf6321fe9b795e7910e8))
* **deps:** Bump @nestjs/config from 3.0.0 to 3.0.1 ([#460](https://github.com/UK-Export-Finance/mdm-api/issues/460)) ([698dafa](https://github.com/UK-Export-Finance/mdm-api/commit/698dafa692b336a4ad85bba081a22db86701496e))
* **deps:** Bump @nestjs/core from 10.1.2 to 10.1.3 ([#371](https://github.com/UK-Export-Finance/mdm-api/issues/371)) ([c5fe5e8](https://github.com/UK-Export-Finance/mdm-api/commit/c5fe5e8d3abbed022d841095ad3cf20ebabf3051))
* **deps:** Bump @nestjs/core from 10.1.3 to 10.2.1 ([#422](https://github.com/UK-Export-Finance/mdm-api/issues/422)) ([07ebd1a](https://github.com/UK-Export-Finance/mdm-api/commit/07ebd1a4807b1837b139d2ecc92e92db8981b341))
* **deps:** Bump @nestjs/core from 10.2.1 to 10.2.4 ([#444](https://github.com/UK-Export-Finance/mdm-api/issues/444)) ([ac39fea](https://github.com/UK-Export-Finance/mdm-api/commit/ac39fea0f1608cb8041c61fcdbe35280612b36af))
* **deps:** Bump @nestjs/core from 10.2.4 to 10.2.5 ([#471](https://github.com/UK-Export-Finance/mdm-api/issues/471)) ([465ecbb](https://github.com/UK-Export-Finance/mdm-api/commit/465ecbb1ec10c8ecafb61545e9e406b2830ee3c3))
* **deps:** Bump @nestjs/platform-express from 10.1.2 to 10.1.3 ([#367](https://github.com/UK-Export-Finance/mdm-api/issues/367)) ([9f4f39e](https://github.com/UK-Export-Finance/mdm-api/commit/9f4f39ea106732cbc5e739be670d219ca3bce0c7))
* **deps:** Bump @nestjs/platform-express from 10.2.1 to 10.2.4 ([#446](https://github.com/UK-Export-Finance/mdm-api/issues/446)) ([eea2eca](https://github.com/UK-Export-Finance/mdm-api/commit/eea2eca3676b9e6189a64c4ae37077ec7c948e7e))
* **deps:** Bump @nestjs/swagger from 7.1.4 to 7.1.6 ([#373](https://github.com/UK-Export-Finance/mdm-api/issues/373)) ([af02e9e](https://github.com/UK-Export-Finance/mdm-api/commit/af02e9ea8ac436b4e1c7aaf8d00967d9a9ef0d14))
* **deps:** Bump @nestjs/swagger from 7.1.6 to 7.1.7 ([d96991e](https://github.com/UK-Export-Finance/mdm-api/commit/d96991e5cfa8f215e9e39d0392f53a0941a4da6d))
* **deps:** Bump @nestjs/swagger from 7.1.6 to 7.1.7 ([#383](https://github.com/UK-Export-Finance/mdm-api/issues/383)) ([a1a9193](https://github.com/UK-Export-Finance/mdm-api/commit/a1a91930ebb438161c80b50b5a6319544485ff40))
* **deps:** Bump @nestjs/swagger from 7.1.7 to 7.1.8 ([#400](https://github.com/UK-Export-Finance/mdm-api/issues/400)) ([922b4f3](https://github.com/UK-Export-Finance/mdm-api/commit/922b4f34d9d3a8174ba66a1218a93a2351c03f47))
* **deps:** Bump @nestjs/swagger from 7.1.8 to 7.1.10 ([#450](https://github.com/UK-Export-Finance/mdm-api/issues/450)) ([edea88d](https://github.com/UK-Export-Finance/mdm-api/commit/edea88dda21b0e861a22915bc2c1075469ed62e4))
* **deps:** Bump axios from 1.4.0 to 1.5.0 ([#433](https://github.com/UK-Export-Finance/mdm-api/issues/433)) ([7de0b1e](https://github.com/UK-Export-Finance/mdm-api/commit/7de0b1e642cb9bd813c9ed09e01da000c0f28932))
* **deps:** Bump Azure/cli from 1.0.7 to 1.0.8 ([#389](https://github.com/UK-Export-Finance/mdm-api/issues/389)) ([0b07a64](https://github.com/UK-Export-Finance/mdm-api/commit/0b07a649ee745fccf892a8e4e7fb100fe9214438))
* **deps:** Bump mssql from 9.1.1 to 9.1.2 ([#375](https://github.com/UK-Export-Finance/mdm-api/issues/375)) ([19a2e04](https://github.com/UK-Export-Finance/mdm-api/commit/19a2e04344d812904a8a4007ee747fc2aa6f6439))
* **deps:** Bump mssql from 9.1.2 to 9.1.3 ([#388](https://github.com/UK-Export-Finance/mdm-api/issues/388)) ([cc47ab3](https://github.com/UK-Export-Finance/mdm-api/commit/cc47ab3df1a8e5a44c85edabdee53b1325734ca9))
* **deps:** Bump mssql from 9.1.3 to 9.2.0 ([#451](https://github.com/UK-Export-Finance/mdm-api/issues/451)) ([d93303a](https://github.com/UK-Export-Finance/mdm-api/commit/d93303a233acce181cfa745b90c54d25cb170ae1))
* **deps:** Bump mssql from 9.2.0 to 10.0.0 ([#458](https://github.com/UK-Export-Finance/mdm-api/issues/458)) ([ef403eb](https://github.com/UK-Export-Finance/mdm-api/commit/ef403eb779e00aea0211069c85d5a63f1706e0a1))
* **deps:** Bump nestjs-pino from 3.3.0 to 3.4.0 ([#419](https://github.com/UK-Export-Finance/mdm-api/issues/419)) ([defde0e](https://github.com/UK-Export-Finance/mdm-api/commit/defde0e262527f813a4828ea3397b63c89d4c8b0))
* **deps:** Bump node from 20.5.0-alpine3.17 to 20.5.1-alpine3.17 ([#398](https://github.com/UK-Export-Finance/mdm-api/issues/398)) ([903d631](https://github.com/UK-Export-Finance/mdm-api/commit/903d63130c8216630c695e4cdd973818a711d426))
* **deps:** Bump node from 20.6.0-alpine3.17 to 20.6.1-alpine3.17 ([#470](https://github.com/UK-Export-Finance/mdm-api/issues/470)) ([616dc47](https://github.com/UK-Export-Finance/mdm-api/commit/616dc4759ce61fba7c67796124b23ac05e09b887))
* **deps:** Bump pino-http from 8.3.3 to 8.4.0 ([dc7c1d0](https://github.com/UK-Export-Finance/mdm-api/commit/dc7c1d0b989bf400f4773db94e137f22dfbfbe69))
* **deps:** Bump pino-http from 8.3.3 to 8.4.0 ([#384](https://github.com/UK-Export-Finance/mdm-api/issues/384)) ([310756b](https://github.com/UK-Export-Finance/mdm-api/commit/310756b552c2d3b3dd20e30cde444708d1ed333f))
* **deps:** Bump pino-http from 8.4.0 to 8.5.0 ([#457](https://github.com/UK-Export-Finance/mdm-api/issues/457)) ([f8f64da](https://github.com/UK-Export-Finance/mdm-api/commit/f8f64da37225d2bad7672f9a2eec9d8c95a3d536))
* **deps:** Bump pino-pretty from 10.1.0 to 10.2.0 ([#354](https://github.com/UK-Export-Finance/mdm-api/issues/354)) ([c9e0418](https://github.com/UK-Export-Finance/mdm-api/commit/c9e041862dc056ad655ad971925468644fbbe77b))
* **deps:** Bump tslib from 2.6.1 to 2.6.2 ([#416](https://github.com/UK-Export-Finance/mdm-api/issues/416)) ([be2d437](https://github.com/UK-Export-Finance/mdm-api/commit/be2d437c78a350d99ed4e2d1a16cab4d8618fb7e))
* **deps:** Bump typeorm-extension from 3.0.0 to 3.0.1 ([#363](https://github.com/UK-Export-Finance/mdm-api/issues/363)) ([d0ae7ab](https://github.com/UK-Export-Finance/mdm-api/commit/d0ae7abc2df0edfbe0adecddbc1105a316403a7d))
* **deps:** Bump typescript from 5.1.6 to 5.2.2 ([#431](https://github.com/UK-Export-Finance/mdm-api/issues/431)) ([f27ae39](https://github.com/UK-Export-Finance/mdm-api/commit/f27ae396ecd5b1f2d58c4f9e37b2820afbc506f7))
* **deps:** update actions/checkout action to v4 ([#452](https://github.com/UK-Export-Finance/mdm-api/issues/452)) ([f5f1fba](https://github.com/UK-Export-Finance/mdm-api/commit/f5f1fbaffc37ac13fab241c7663d6536e8bb0c6d))
* **deps:** update all ([#417](https://github.com/UK-Export-Finance/mdm-api/issues/417)) ([4cf5076](https://github.com/UK-Export-Finance/mdm-api/commit/4cf5076c2062f4f5ac7ffa6881620a2f0cf9fe0e))
* **deps:** update dependency jest to v29.7.0 ([#476](https://github.com/UK-Export-Finance/mdm-api/issues/476)) ([4c5a4a7](https://github.com/UK-Export-Finance/mdm-api/commit/4c5a4a7f603001d89f358ed323a77331866faf57))

## [1.15.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.15.0...v1.15.1) (2023-07-25)


### Bug Fixes

* **deps:** update dependency tslib to v2.6.1 ([#338](https://github.com/UK-Export-Finance/mdm-api/issues/338)) ([824cc52](https://github.com/UK-Export-Finance/mdm-api/commit/824cc5252162820ba404f755f2083f13195ac9bb))
* **iac:** ACR ([#343](https://github.com/UK-Export-Finance/mdm-api/issues/343)) ([51d2316](https://github.com/UK-Export-Finance/mdm-api/commit/51d2316707eb3073c67c2eccd14dd8d3194b9a0f))


### Miscellaneous

* **deps-dev:** Bump @types/node from 20.4.2 to 20.4.4 ([#341](https://github.com/UK-Export-Finance/mdm-api/issues/341)) ([38019c5](https://github.com/UK-Export-Finance/mdm-api/commit/38019c53c10bc15b480a5f291389e2ea057f70a5))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.1.0 to 6.2.0 ([#345](https://github.com/UK-Export-Finance/mdm-api/issues/345)) ([d7a9db0](https://github.com/UK-Export-Finance/mdm-api/commit/d7a9db0b1e0ebb61d566c12545379ec2cb7ef5a9))
* **deps:** Bump @nestjs/common from 10.1.0 to 10.1.1 ([#348](https://github.com/UK-Export-Finance/mdm-api/issues/348)) ([02a6d8f](https://github.com/UK-Export-Finance/mdm-api/commit/02a6d8f7ca110f3a0841496b9b6e35b5f7fab00d))
* **deps:** Bump @nestjs/common from 10.1.1 to 10.1.2 ([#349](https://github.com/UK-Export-Finance/mdm-api/issues/349)) ([f7d40b5](https://github.com/UK-Export-Finance/mdm-api/commit/f7d40b531fc061c3dc6a6c4a03638482f5204f07))
* **deps:** Bump @nestjs/core from 10.1.0 to 10.1.1 ([#346](https://github.com/UK-Export-Finance/mdm-api/issues/346)) ([1305828](https://github.com/UK-Export-Finance/mdm-api/commit/13058282665cd43dc06535be39ee50f1c54e0cec))
* **deps:** Bump @nestjs/platform-express from 10.1.0 to 10.1.1 ([#344](https://github.com/UK-Export-Finance/mdm-api/issues/344)) ([e712f8b](https://github.com/UK-Export-Finance/mdm-api/commit/e712f8bb1628d153769a97df6fc2aff80a8a4dbd))
* **deps:** Bump node from 20.4.0-alpine3.17 to 20.5.0-alpine3.17 ([#339](https://github.com/UK-Export-Finance/mdm-api/issues/339)) ([bb8042e](https://github.com/UK-Export-Finance/mdm-api/commit/bb8042e4ccb7c0db31a5a4c77536710b8f5121d1))
* **deps:** Bump pino-pretty from 10.0.1 to 10.1.0 ([#340](https://github.com/UK-Export-Finance/mdm-api/issues/340)) ([33c2020](https://github.com/UK-Export-Finance/mdm-api/commit/33c2020be83c33984d9b204d772689854960c8ec))
* **deps:** Bump tslib from 2.6.0 to 2.6.1 ([#347](https://github.com/UK-Export-Finance/mdm-api/issues/347)) ([70c408c](https://github.com/UK-Export-Finance/mdm-api/commit/70c408c67724102da30c639d0299ceb807be4e14))
* **deps:** dependencies updates ([#350](https://github.com/UK-Export-Finance/mdm-api/issues/350)) ([f86fe4a](https://github.com/UK-Export-Finance/mdm-api/commit/f86fe4a2bcba02590f6d2202789a306c08f59ab3))

## [1.15.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.14.0...v1.15.0) (2023-07-21)


### Features

* **APIM-471:** added constants for examples, + cleanup ([d27b131](https://github.com/UK-Export-Finance/mdm-api/commit/d27b131938a5e6a44a903092e505bbeb55fb141e))
* **APIM-471:** added LOG_LEVEL env var to deployment and github files ([6eaba2e](https://github.com/UK-Export-Finance/mdm-api/commit/6eaba2e1f9f9e8e6414d1630d0078288082c1306))
* **APIM-471:** added new environment variables to docker files ([3ef1328](https://github.com/UK-Export-Finance/mdm-api/commit/3ef132808e36cc329ad8525f19ab3063b948820d))
* **APIM-471:** cleanup, rename query var and other PR comments ([1d1787e](https://github.com/UK-Export-Finance/mdm-api/commit/1d1787e976c340ceebd824b2bb414a6995821feb))
* **APIM-471:** endpoint GET /customers - get information from Salesforce through Informatica REST API ([#280](https://github.com/UK-Export-Finance/mdm-api/issues/280)) ([df5150f](https://github.com/UK-Export-Finance/mdm-api/commit/df5150f590a63cc1e895bea301ff7c1ad117b68c))
* **APIM-471:** fixed informatica query ([82f620f](https://github.com/UK-Export-Finance/mdm-api/commit/82f620f2349944709d345d2119cc476166b16578))
* **APIM-471:** tests and changes for endpoint GET /customers ([7b82183](https://github.com/UK-Export-Finance/mdm-api/commit/7b821830c2512d54bde500d7863ef41aea6262e4))


### Bug Fixes

* **APIM-531:** fix swagger regex field ([#300](https://github.com/UK-Export-Finance/mdm-api/issues/300)) ([b6d09b7](https://github.com/UK-Export-Finance/mdm-api/commit/b6d09b757b8e1fdac806250cb412956db0bf7279))
* **APIM-531:** fix swagger regex field ([#313](https://github.com/UK-Export-Finance/mdm-api/issues/313)) ([6e94688](https://github.com/UK-Export-Finance/mdm-api/commit/6e946882c3a8ce9f5cfeee6fd2023fd7ba094155))
* **deps:** update dependency @nestjs/swagger to v7.1.2 ([#331](https://github.com/UK-Export-Finance/mdm-api/issues/331)) ([db807a6](https://github.com/UK-Export-Finance/mdm-api/commit/db807a68f5020c839f890c2d6b2b525e6ed6ffef))
* **env:** environment variable update ([#299](https://github.com/UK-Export-Finance/mdm-api/issues/299)) ([3dff5b0](https://github.com/UK-Export-Finance/mdm-api/commit/3dff5b084b8b8a04f8b8c6d75abb7fbee187c077))


### Miscellaneous

* **deps-dev:** Bump @commitlint/cli from 17.6.6 to 17.6.7 ([#333](https://github.com/UK-Export-Finance/mdm-api/issues/333)) ([0e038b8](https://github.com/UK-Export-Finance/mdm-api/commit/0e038b828778fcdb822bc03ced45ca74b69bf9e1))
* **deps-dev:** Bump @commitlint/config-conventional from 17.6.6 to 17.6.7 ([#334](https://github.com/UK-Export-Finance/mdm-api/issues/334)) ([91ef159](https://github.com/UK-Export-Finance/mdm-api/commit/91ef1593a0d7834707961e7cf9a931dca22c6a13))
* **deps-dev:** Bump @nestjs/cli from 10.1.1 to 10.1.3 ([#287](https://github.com/UK-Export-Finance/mdm-api/issues/287)) ([fb54e6c](https://github.com/UK-Export-Finance/mdm-api/commit/fb54e6c1c9be46ee65572095156e01cfb4a9833a))
* **deps-dev:** Bump @nestjs/cli from 10.1.8 to 10.1.9 ([26c30cd](https://github.com/UK-Export-Finance/mdm-api/commit/26c30cd816b89c8fa16ad4a7628e43d47b4e8d34))
* **deps-dev:** Bump @nestjs/cli from 10.1.8 to 10.1.9 ([#320](https://github.com/UK-Export-Finance/mdm-api/issues/320)) ([ed3ea84](https://github.com/UK-Export-Finance/mdm-api/commit/ed3ea84a6f85da5690a641dc23fcb98f79b8f8aa))
* **deps-dev:** Bump @nestjs/cli from 10.1.9 to 10.1.10 ([#335](https://github.com/UK-Export-Finance/mdm-api/issues/335)) ([1956af3](https://github.com/UK-Export-Finance/mdm-api/commit/1956af3a813d70cb96b925f4d18c193c92338a12))
* **deps-dev:** Bump @tsconfig/node20 from 1.0.2 to 20.1.0 ([333b439](https://github.com/UK-Export-Finance/mdm-api/commit/333b4395824cf165618da500195af87792dc6ecf))
* **deps-dev:** Bump @tsconfig/node20 from 1.0.2 to 20.1.0 ([#319](https://github.com/UK-Export-Finance/mdm-api/issues/319)) ([7df6d01](https://github.com/UK-Export-Finance/mdm-api/commit/7df6d014278b084b93434a03ae0acba92a28a5ca))
* **deps-dev:** Bump @types/jest from 29.5.2 to 29.5.3 ([#304](https://github.com/UK-Export-Finance/mdm-api/issues/304)) ([25fd473](https://github.com/UK-Export-Finance/mdm-api/commit/25fd4734288d0e14391e8920faffa8cc2a4ea700))
* **deps-dev:** Bump @types/node from 20.4.0 to 20.4.1 ([#298](https://github.com/UK-Export-Finance/mdm-api/issues/298)) ([f1c90c1](https://github.com/UK-Export-Finance/mdm-api/commit/f1c90c1830dffaa66a697f0cd394c0679e408747))
* **deps-dev:** Bump @types/node from 20.4.1 to 20.4.2 ([#314](https://github.com/UK-Export-Finance/mdm-api/issues/314)) ([826d696](https://github.com/UK-Export-Finance/mdm-api/commit/826d6965898e7da7aeee259a003b5d6b0c6e13ab))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([aec87b6](https://github.com/UK-Export-Finance/mdm-api/commit/aec87b664b29e20a915f9345eea5f97b3e71e49c))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.60.1 to 5.61.0 ([#285](https://github.com/UK-Export-Finance/mdm-api/issues/285)) ([003f662](https://github.com/UK-Export-Finance/mdm-api/commit/003f662fcb26f855fe7dd0fb9d67f339f57396b8))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.61.0 to 6.0.0 ([#305](https://github.com/UK-Export-Finance/mdm-api/issues/305)) ([28c8eb2](https://github.com/UK-Export-Finance/mdm-api/commit/28c8eb2de4e2d401f272fe8d98bf6b9bda9bf536))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 6.0.0 to 6.1.0 ([#325](https://github.com/UK-Export-Finance/mdm-api/issues/325)) ([7c4d6d9](https://github.com/UK-Export-Finance/mdm-api/commit/7c4d6d937855fc25dfd99e04a448ada6acdf385c))
* **deps-dev:** Bump @typescript-eslint/parser from 5.60.1 to 5.61.0 ([#283](https://github.com/UK-Export-Finance/mdm-api/issues/283)) ([ef690f8](https://github.com/UK-Export-Finance/mdm-api/commit/ef690f8474871783b11caccf9f477236d1e63099))
* **deps-dev:** Bump @typescript-eslint/parser from 5.62.0 to 6.0.0 ([2dcab0d](https://github.com/UK-Export-Finance/mdm-api/commit/2dcab0d7ff5789a0d165dd4dc98ca56387556221))
* **deps-dev:** Bump @typescript-eslint/parser from 5.62.0 to 6.0.0 ([#321](https://github.com/UK-Export-Finance/mdm-api/issues/321)) ([ff84253](https://github.com/UK-Export-Finance/mdm-api/commit/ff842535f8a3f504b82a3eeb337e1bbde123d432))
* **deps-dev:** Bump @typescript-eslint/parser from 6.0.0 to 6.1.0 ([25743dc](https://github.com/UK-Export-Finance/mdm-api/commit/25743dcc579ad607a4d67a299c5e87e8731a2083))
* **deps-dev:** Bump @typescript-eslint/parser from 6.0.0 to 6.1.0 ([#326](https://github.com/UK-Export-Finance/mdm-api/issues/326)) ([1ea233a](https://github.com/UK-Export-Finance/mdm-api/commit/1ea233a00f08d028c4f5e8b981dc69180d53ec3a))
* **deps-dev:** Bump cspell from 6.31.1 to 6.31.2 ([1904167](https://github.com/UK-Export-Finance/mdm-api/commit/1904167b018e5ad78a75c6f8e5e4c48f3a079b2e))
* **deps-dev:** Bump cspell from 6.31.1 to 6.31.2 ([#323](https://github.com/UK-Export-Finance/mdm-api/issues/323)) ([67abd58](https://github.com/UK-Export-Finance/mdm-api/commit/67abd58fb3359aa4e4e92042f68b3f7cf5655ea5))
* **deps-dev:** Bump eslint from 8.44.0 to 8.45.0 ([65919e0](https://github.com/UK-Export-Finance/mdm-api/commit/65919e0e2eb9a1338678a6f0fbe370ca40529882))
* **deps-dev:** Bump eslint from 8.44.0 to 8.45.0 ([#322](https://github.com/UK-Export-Finance/mdm-api/issues/322)) ([a44aa79](https://github.com/UK-Export-Finance/mdm-api/commit/a44aa799f00231ea0fced69f517e507e16f7bc88))
* **deps-dev:** Bump eslint-config-airbnb-typescript from 17.0.0 to 17.1.0 ([#317](https://github.com/UK-Export-Finance/mdm-api/issues/317)) ([4f2db84](https://github.com/UK-Export-Finance/mdm-api/commit/4f2db842f52eefd49b41ec463adc97b68f6a990f))
* **deps-dev:** Bump eslint-plugin-jest from 27.2.2 to 27.2.3 ([#315](https://github.com/UK-Export-Finance/mdm-api/issues/315)) ([a0a6b21](https://github.com/UK-Export-Finance/mdm-api/commit/a0a6b2173730c3bd24952734c0fcd7e4e4de15ac))
* **deps-dev:** Bump eslint-plugin-prettier from 4.2.1 to 5.0.0 ([#311](https://github.com/UK-Export-Finance/mdm-api/issues/311)) ([db652fd](https://github.com/UK-Export-Finance/mdm-api/commit/db652fd22383ee323462508cbb38b0e32c743f9a))
* **deps-dev:** Bump eslint-plugin-unused-imports from 2.0.0 to 3.0.0 ([#310](https://github.com/UK-Export-Finance/mdm-api/issues/310)) ([f828298](https://github.com/UK-Export-Finance/mdm-api/commit/f828298d47e4e84ae9eb735060a994ee6037f9c5))
* **deps-dev:** Bump jest from 29.6.0 to 29.6.1 ([f00d7a7](https://github.com/UK-Export-Finance/mdm-api/commit/f00d7a7a832d2e58c6b6f4e5579a60be77ec5494))
* **deps-dev:** Bump jest from 29.6.0 to 29.6.1 ([#296](https://github.com/UK-Export-Finance/mdm-api/issues/296)) ([573a43c](https://github.com/UK-Export-Finance/mdm-api/commit/573a43c8e0cb638dcd5a49c6f2be2935f14ec174))
* **deps-dev:** Bump nock from 13.3.1 to 13.3.2 ([#316](https://github.com/UK-Export-Finance/mdm-api/issues/316)) ([eff446c](https://github.com/UK-Export-Finance/mdm-api/commit/eff446c9adb3257e60f8fdc5b2707ba3340a87cf))
* **deps-dev:** Bump prettier from 2.8.8 to 3.0.0 ([#294](https://github.com/UK-Export-Finance/mdm-api/issues/294)) ([b348897](https://github.com/UK-Export-Finance/mdm-api/commit/b348897494e236a49561839411f58842d8ae640a))
* **deps-dev:** Bump prettier from 2.8.8 to 3.0.0 ([#307](https://github.com/UK-Export-Finance/mdm-api/issues/307)) ([4b29e63](https://github.com/UK-Export-Finance/mdm-api/commit/4b29e63b81dc563594f723b706908527a03a0067))
* **deps-dev:** Bump sort-package-json from 2.5.0 to 2.5.1 ([#297](https://github.com/UK-Export-Finance/mdm-api/issues/297)) ([488df4d](https://github.com/UK-Export-Finance/mdm-api/commit/488df4d879af698c27a6b38d32edae35255eb7c4))
* **deps:** Bump @nestjs/common from 10.0.5 to 10.1.0 ([942060c](https://github.com/UK-Export-Finance/mdm-api/commit/942060c825369f4855471395e9288bc4c55f904e))
* **deps:** Bump @nestjs/common from 10.0.5 to 10.1.0 ([#327](https://github.com/UK-Export-Finance/mdm-api/issues/327)) ([9b3d196](https://github.com/UK-Export-Finance/mdm-api/commit/9b3d1967e7b2d63376043c29c09cb007057ca214))
* **deps:** Bump @nestjs/core from 10.0.5 to 10.1.0 ([1e1a872](https://github.com/UK-Export-Finance/mdm-api/commit/1e1a872c83474400fc3f958eefa31b5fc0776c0c))
* **deps:** Bump @nestjs/core from 10.0.5 to 10.1.0 ([#329](https://github.com/UK-Export-Finance/mdm-api/issues/329)) ([3433ce0](https://github.com/UK-Export-Finance/mdm-api/commit/3433ce0bcf1b737038caa85deef4219f71ffc7ae))
* **deps:** Bump @nestjs/platform-express from 10.0.5 to 10.1.0 ([3581a17](https://github.com/UK-Export-Finance/mdm-api/commit/3581a171395b9218d250324e6fa1c506667e780f))
* **deps:** Bump @nestjs/platform-express from 10.0.5 to 10.1.0 ([#328](https://github.com/UK-Export-Finance/mdm-api/issues/328)) ([b2988a4](https://github.com/UK-Export-Finance/mdm-api/commit/b2988a4ca8d100db06f08607e7a0573843d20b83))
* **deps:** Bump @nestjs/swagger from 7.1.1 to 7.1.2 ([#336](https://github.com/UK-Export-Finance/mdm-api/issues/336)) ([6c7cd60](https://github.com/UK-Export-Finance/mdm-api/commit/6c7cd606597d8e66d87fe82055c43736f7e6e2b0))
* **deps:** docker node update ([#330](https://github.com/UK-Export-Finance/mdm-api/issues/330)) ([cee9623](https://github.com/UK-Export-Finance/mdm-api/commit/cee96236b38f7778f75d9b9590116cb6949a2a3d))
* **deps:** update dependency @nestjs/cli to v10.1.3 ([#284](https://github.com/UK-Export-Finance/mdm-api/issues/284)) ([0782f8a](https://github.com/UK-Export-Finance/mdm-api/commit/0782f8ae29ab688b9b41c28d7229d28b80d48bc8))
* **deps:** update dependency @nestjs/cli to v10.1.7 ([#291](https://github.com/UK-Export-Finance/mdm-api/issues/291)) ([d71fe4e](https://github.com/UK-Export-Finance/mdm-api/commit/d71fe4e271a31d2f275ce4dd03e8d99efaab6a57))
* **deps:** update dependency @nestjs/cli to v10.1.8 ([#308](https://github.com/UK-Export-Finance/mdm-api/issues/308)) ([2bf093a](https://github.com/UK-Export-Finance/mdm-api/commit/2bf093a6671d6ba4240d979363f530e08a467ffd))
* **deps:** update dependency @types/jest to v29.5.3 ([#301](https://github.com/UK-Export-Finance/mdm-api/issues/301)) ([b1910cb](https://github.com/UK-Export-Finance/mdm-api/commit/b1910cb8f9e5dbd29bd2ef6fbb8611c952dfea7b))
* **deps:** update dependency @types/node to v20.4.0 ([#293](https://github.com/UK-Export-Finance/mdm-api/issues/293)) ([a36fa82](https://github.com/UK-Export-Finance/mdm-api/commit/a36fa82326a10470bb0379bfbd4b875a3b5e6252))
* **deps:** update dependency @typescript-eslint/parser to v5.61.0 ([#281](https://github.com/UK-Export-Finance/mdm-api/issues/281)) ([f2ab74a](https://github.com/UK-Export-Finance/mdm-api/commit/f2ab74a2f62f57221b085c63f770c75f3a325923))
* **deps:** update dependency jest to v29.6.0 ([#289](https://github.com/UK-Export-Finance/mdm-api/issues/289)) ([966d0ff](https://github.com/UK-Export-Finance/mdm-api/commit/966d0ff6f810839295010ca8096097beed978574))
* **deps:** update dependency jest to v29.6.1 ([#295](https://github.com/UK-Export-Finance/mdm-api/issues/295)) ([80a589f](https://github.com/UK-Export-Finance/mdm-api/commit/80a589fc9399d127b4307de3da2128adfa166bc0))
* **deps:** update typescript-eslint monorepo to v5.62.0 ([#302](https://github.com/UK-Export-Finance/mdm-api/issues/302)) ([9cd28a9](https://github.com/UK-Export-Finance/mdm-api/commit/9cd28a9548e2562e1aeba2a1ca253d917d240b55))
* **dockerfile:** version updates ([#332](https://github.com/UK-Export-Finance/mdm-api/issues/332)) ([d4da75b](https://github.com/UK-Export-Finance/mdm-api/commit/d4da75b29bdd4dd28f7bfaa8132d785e34613722))

## [1.14.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.13.0...v1.14.0) (2023-07-03)


### Features

* **APIM-261:** API import post deployment ([#210](https://github.com/UK-Export-Finance/mdm-api/issues/210)) ([670f5f9](https://github.com/UK-Export-Finance/mdm-api/commit/670f5f9ca76a1a0d2fbfc09c3d90267eaad5b390))
* **APIM-261:** individual database hosts ([#207](https://github.com/UK-Export-Finance/mdm-api/issues/207)) ([38e9e9e](https://github.com/UK-Export-Finance/mdm-api/commit/38e9e9e978fc330e3dbef2c7d49ee640804d0367))


### Bug Fixes

* **APIM-207:** Iac Monitor ([#218](https://github.com/UK-Export-Finance/mdm-api/issues/218)) ([e43bf3f](https://github.com/UK-Export-Finance/mdm-api/commit/e43bf3fc8f6074de5c77e1eee02d034fd362e783))
* **deployment:** api import ([#237](https://github.com/UK-Export-Finance/mdm-api/issues/237)) ([5ffc5e3](https://github.com/UK-Export-Finance/mdm-api/commit/5ffc5e382acbc9721ed76d7ec15ec3cf49f96a38))
* **deps:** update all ([#251](https://github.com/UK-Export-Finance/mdm-api/issues/251)) ([0ceeb63](https://github.com/UK-Export-Finance/mdm-api/commit/0ceeb634a3cf46658356af15639ebffb8100a28f))
* **deps:** update all ([#266](https://github.com/UK-Export-Finance/mdm-api/issues/266)) ([a7586f9](https://github.com/UK-Export-Finance/mdm-api/commit/a7586f9bb510c6dd089c546a9d1ee86a80d7de71))
* **deps:** update dependency @nestjs/config to v2.3.4 ([#239](https://github.com/UK-Export-Finance/mdm-api/issues/239)) ([49417b2](https://github.com/UK-Export-Finance/mdm-api/commit/49417b2d0f0d84b7776b0bdb9f2d8fdb0eaea5f4))
* **deps:** update dependency @nestjs/config to v3 ([#241](https://github.com/UK-Export-Finance/mdm-api/issues/241)) ([54b776f](https://github.com/UK-Export-Finance/mdm-api/commit/54b776f2e981edd1f529fbf3a41aa2ad1a8a2f2e))
* **deps:** update dependency @nestjs/swagger to v7 ([#249](https://github.com/UK-Export-Finance/mdm-api/issues/249)) ([9d1c5ef](https://github.com/UK-Export-Finance/mdm-api/commit/9d1c5ef18b0844a561b38121556105e59e59ed78))
* **deps:** update dependency @nestjs/swagger to v7.0.12 ([#274](https://github.com/UK-Export-Finance/mdm-api/issues/274)) ([062eb78](https://github.com/UK-Export-Finance/mdm-api/commit/062eb780b0c10cacfd596bd5e1506709238ba48b))
* **deps:** update dependency @nestjs/swagger to v7.0.3 ([#258](https://github.com/UK-Export-Finance/mdm-api/issues/258)) ([749de27](https://github.com/UK-Export-Finance/mdm-api/commit/749de27928010bedc069a95b57e25bfeb85a3a79))
* **deps:** update dependency @nestjs/swagger to v7.0.4 ([#260](https://github.com/UK-Export-Finance/mdm-api/issues/260)) ([32b755f](https://github.com/UK-Export-Finance/mdm-api/commit/32b755f47ee07f477eefd8ed6eddae17cfa4a0ef))
* **deps:** update dependency @nestjs/typeorm to v10 ([#242](https://github.com/UK-Export-Finance/mdm-api/issues/242)) ([90198d1](https://github.com/UK-Export-Finance/mdm-api/commit/90198d1860163956b80d567ac72f56bb4e5abb83))
* **deps:** update dependency dotenv to v16.2.0 ([#245](https://github.com/UK-Export-Finance/mdm-api/issues/245)) ([21fbf68](https://github.com/UK-Export-Finance/mdm-api/commit/21fbf6865c8d112c3d9c4025f9048e7fdfe1b921))
* **deps:** update dependency nestjs-pino to v3.3.0 ([#244](https://github.com/UK-Export-Finance/mdm-api/issues/244)) ([50e8021](https://github.com/UK-Export-Finance/mdm-api/commit/50e8021d0be7d1b96d0a274edad75dbfe02bdee6))
* **deps:** update dependency typeorm to v0.3.17 ([#256](https://github.com/UK-Export-Finance/mdm-api/issues/256)) ([f50c492](https://github.com/UK-Export-Finance/mdm-api/commit/f50c492df0f22da2430083caffa95b56da15a265))
* **deps:** update nest monorepo to v10 (major) ([#243](https://github.com/UK-Export-Finance/mdm-api/issues/243)) ([248cbed](https://github.com/UK-Export-Finance/mdm-api/commit/248cbed6dfae5b73bb2ba9d3a2202b6beb7f174c))
* **deps:** update nest monorepo to v10.0.4 ([#275](https://github.com/UK-Export-Finance/mdm-api/issues/275)) ([5cd06c6](https://github.com/UK-Export-Finance/mdm-api/commit/5cd06c64257edc0da1088350f82ff9c23d55a97c))
* **deps:** update nest monorepo to v10.0.5 ([#279](https://github.com/UK-Export-Finance/mdm-api/issues/279)) ([17f0172](https://github.com/UK-Export-Finance/mdm-api/commit/17f01722f03fa0599c32a40ca4cb783b7781f630))
* **iac:** added custom dns for vnet ([#262](https://github.com/UK-Export-Finance/mdm-api/issues/262)) ([927057a](https://github.com/UK-Export-Finance/mdm-api/commit/927057afc1a8d4bd8b38702825821e4e3604af29))
* **iac:** code improvement ([#250](https://github.com/UK-Export-Finance/mdm-api/issues/250)) ([5f7b1df](https://github.com/UK-Export-Finance/mdm-api/commit/5f7b1df1b4f952a772e36ed096f83aa2bcf306ea))
* **iac:** deployment ([#238](https://github.com/UK-Export-Finance/mdm-api/issues/238)) ([b24ed3b](https://github.com/UK-Export-Finance/mdm-api/commit/b24ed3b241d41c8924691829234422cfd9d96281))
* **iac:** deployment improvement ([#255](https://github.com/UK-Export-Finance/mdm-api/issues/255)) ([a54914a](https://github.com/UK-Export-Finance/mdm-api/commit/a54914a9f76b5d370c4e43463581761dfb582b86))
* **remove-env:** removed API_KEY_STRATEGY env variable ([#229](https://github.com/UK-Export-Finance/mdm-api/issues/229)) ([804aacf](https://github.com/UK-Export-Finance/mdm-api/commit/804aacf126cec19cca7644bc35ed469668404ae2))


### Documentation

* **cicd:** updated documentation + deps bump ([#220](https://github.com/UK-Export-Finance/mdm-api/issues/220)) ([441c570](https://github.com/UK-Export-Finance/mdm-api/commit/441c5709c55527ac2d1e83bfec710aae4be9eb6f))


### Miscellaneous

* **deps-dev:** Bump @commitlint/cli from 17.6.3 to 17.6.5 ([#217](https://github.com/UK-Export-Finance/mdm-api/issues/217)) ([dda7e48](https://github.com/UK-Export-Finance/mdm-api/commit/dda7e48ba9559843433a64364df601a7622c5d8a))
* **deps-dev:** Bump @commitlint/config-conventional from 17.6.3 to 17.6.5 ([#212](https://github.com/UK-Export-Finance/mdm-api/issues/212)) ([873b265](https://github.com/UK-Export-Finance/mdm-api/commit/873b265d967a2b5aa75b88d39f436316dc1fe3de))
* **deps-dev:** Bump @tsconfig/node20 from 1.0.1 to 1.0.2 ([#270](https://github.com/UK-Export-Finance/mdm-api/issues/270)) ([bf5f19a](https://github.com/UK-Export-Finance/mdm-api/commit/bf5f19a2bbce2f45bcb4a946a5d24af6dc16bd05))
* **deps-dev:** Bump @types/node from 20.2.3 to 20.2.4 ([#208](https://github.com/UK-Export-Finance/mdm-api/issues/208)) ([0437bbc](https://github.com/UK-Export-Finance/mdm-api/commit/0437bbc39fe5c3f469b6e93853f0b5cdd9671dfc))
* **deps-dev:** Bump @types/node from 20.2.4 to 20.2.5 ([#211](https://github.com/UK-Export-Finance/mdm-api/issues/211)) ([e008785](https://github.com/UK-Export-Finance/mdm-api/commit/e008785b6bbfc1529034ccb2760425a09d133f92))
* **deps-dev:** Bump @types/node from 20.2.5 to 20.3.0 ([#230](https://github.com/UK-Export-Finance/mdm-api/issues/230)) ([d404798](https://github.com/UK-Export-Finance/mdm-api/commit/d4047985a70464e68708e4f4ba9e435af5191bd1))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.7 to 5.59.8 ([#215](https://github.com/UK-Export-Finance/mdm-api/issues/215)) ([1ab90c4](https://github.com/UK-Export-Finance/mdm-api/commit/1ab90c4c8d44a50b127bbbee7641c931b61b1f49))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.8 to 5.59.9 ([#227](https://github.com/UK-Export-Finance/mdm-api/issues/227)) ([61d28cc](https://github.com/UK-Export-Finance/mdm-api/commit/61d28ccc29bb620285ccbf932cfb46e6684128e6))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.7 to 5.59.8 ([#214](https://github.com/UK-Export-Finance/mdm-api/issues/214)) ([f1ade01](https://github.com/UK-Export-Finance/mdm-api/commit/f1ade0169bde70eb3be19df5628b5047bb364ec3))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.8 to 5.59.9 ([#226](https://github.com/UK-Export-Finance/mdm-api/issues/226)) ([be33aac](https://github.com/UK-Export-Finance/mdm-api/commit/be33aac6ec06a4b151bb5c8ca33d87c8f1811c44))
* **deps-dev:** Bump eslint from 8.41.0 to 8.42.0 ([#225](https://github.com/UK-Export-Finance/mdm-api/issues/225)) ([f4733fc](https://github.com/UK-Export-Finance/mdm-api/commit/f4733fc17ff2c322dbf11db8f8d2c83bd1df8c05))
* **deps-dev:** Bump lint-staged from 13.2.2 to 13.2.3 ([#268](https://github.com/UK-Export-Finance/mdm-api/issues/268)) ([2897292](https://github.com/UK-Export-Finance/mdm-api/commit/289729254a221c913bbdb1239a2649730ec579d2))
* **deps-dev:** Bump ts-loader from 9.4.3 to 9.4.4 ([#271](https://github.com/UK-Export-Finance/mdm-api/issues/271)) ([5a217aa](https://github.com/UK-Export-Finance/mdm-api/commit/5a217aaca16af5f3ef4bd946376cc0b5c1afd815))
* **deps:** Bump @nestjs/config from 2.3.2 to 2.3.3 ([#231](https://github.com/UK-Export-Finance/mdm-api/issues/231)) ([9e021e1](https://github.com/UK-Export-Finance/mdm-api/commit/9e021e193343579c27c647399d598a7cba59a189))
* **deps:** Bump @nestjs/passport from 9.0.3 to 10.0.0 ([#247](https://github.com/UK-Export-Finance/mdm-api/issues/247)) ([7848b52](https://github.com/UK-Export-Finance/mdm-api/commit/7848b527e962d7bfca2e1c038658f79a4f6a66d0))
* **deps:** Bump @nestjs/swagger from 7.0.10 to 7.0.11 ([#272](https://github.com/UK-Export-Finance/mdm-api/issues/272)) ([ea1ced8](https://github.com/UK-Export-Finance/mdm-api/commit/ea1ced86f3987fc8642c383f9f82efa2a9703e1d))
* **deps:** Bump @nestjs/swagger from 7.0.3 to 7.0.4 ([#259](https://github.com/UK-Export-Finance/mdm-api/issues/259)) ([7c53732](https://github.com/UK-Export-Finance/mdm-api/commit/7c53732bb7a2d86cbdcee13be81ac12daea4e875))
* **deps:** Bump @nestjs/swagger from 7.0.6 to 7.0.10 ([#267](https://github.com/UK-Export-Finance/mdm-api/issues/267)) ([58b8eb1](https://github.com/UK-Export-Finance/mdm-api/commit/58b8eb1ab251535cc41a5b7eb86a49b9a42d4a15))
* **deps:** Bump @nestjs/terminus from 9.2.2 to 10.0.1 ([#252](https://github.com/UK-Export-Finance/mdm-api/issues/252)) ([5edcdde](https://github.com/UK-Export-Finance/mdm-api/commit/5edcdde9299a4b432e72be4ae2eebf9d69f6b147))
* **deps:** Bump dotenv from 16.0.3 to 16.1.1 ([#216](https://github.com/UK-Export-Finance/mdm-api/issues/216)) ([48f8729](https://github.com/UK-Export-Finance/mdm-api/commit/48f87292d27e38226f1d69854e146c0459cdfdfd))
* **deps:** Bump dotenv from 16.1.2 to 16.1.3 ([#221](https://github.com/UK-Export-Finance/mdm-api/issues/221)) ([0c9c3c8](https://github.com/UK-Export-Finance/mdm-api/commit/0c9c3c8fadf68a2bcbeba4982d8122813067ef9b))
* **deps:** Bump dotenv from 16.1.3 to 16.1.4 ([#224](https://github.com/UK-Export-Finance/mdm-api/issues/224)) ([4dc4ba8](https://github.com/UK-Export-Finance/mdm-api/commit/4dc4ba8deec362e6c5f7b27af167c1e79a9d4bf2))
* **deps:** Bump tslib from 2.5.2 to 2.5.3 ([#223](https://github.com/UK-Export-Finance/mdm-api/issues/223)) ([ac676c4](https://github.com/UK-Export-Finance/mdm-api/commit/ac676c4cb4fdedfc05757722d5af8262ab1e284b))
* **deps:** Bump typeorm from 0.3.16 to 0.3.17 ([#257](https://github.com/UK-Export-Finance/mdm-api/issues/257)) ([1620abe](https://github.com/UK-Export-Finance/mdm-api/commit/1620abece29b683e336ee0862748930e8eb24c3b))
* **deps:** Bump typeorm-extension from 2.8.0 to 2.8.1 ([#213](https://github.com/UK-Export-Finance/mdm-api/issues/213)) ([1a410cc](https://github.com/UK-Export-Finance/mdm-api/commit/1a410ccc378d2dcf906144b83e0206a9f4a0c8d7))
* **deps:** Bump typescript from 5.0.4 to 5.1.3 ([#222](https://github.com/UK-Export-Finance/mdm-api/issues/222)) ([d4fdc70](https://github.com/UK-Export-Finance/mdm-api/commit/d4fdc703419caa571ea3e102962d050a1ea8fffb))
* **deps:** Bump typescript from 5.1.3 to 5.1.5 ([#269](https://github.com/UK-Export-Finance/mdm-api/issues/269)) ([84c8dfd](https://github.com/UK-Export-Finance/mdm-api/commit/84c8dfd26025a61b234ec03857c121fff11d8b56))
* **deps:** Bump typescript from 5.1.5 to 5.1.6 ([#273](https://github.com/UK-Export-Finance/mdm-api/issues/273)) ([278035a](https://github.com/UK-Export-Finance/mdm-api/commit/278035a050fe608e36bf4eaf8efe1d308ccaf3fe))
* **deps:** update all ([#253](https://github.com/UK-Export-Finance/mdm-api/issues/253)) ([7e2317c](https://github.com/UK-Export-Finance/mdm-api/commit/7e2317c358283772751998f02216649c288f340f))
* **deps:** update all ([#264](https://github.com/UK-Export-Finance/mdm-api/issues/264)) ([b56b92c](https://github.com/UK-Export-Finance/mdm-api/commit/b56b92c584e91e13f868431afc987e73ba433e32))
* **deps:** update all ([#276](https://github.com/UK-Export-Finance/mdm-api/issues/276)) ([2fe3c92](https://github.com/UK-Export-Finance/mdm-api/commit/2fe3c9209f0cef1a46cc962638241302f72cd08e))
* **deps:** update commitlint monorepo to v17.6.6 ([#263](https://github.com/UK-Export-Finance/mdm-api/issues/263)) ([21ebc15](https://github.com/UK-Export-Finance/mdm-api/commit/21ebc156eadbb8248d749b8b77d8412fec459c09))
* **deps:** update dependency @nestjs/cli to v10 ([#240](https://github.com/UK-Export-Finance/mdm-api/issues/240)) ([f11f43a](https://github.com/UK-Export-Finance/mdm-api/commit/f11f43aabe3133be1a5a97bd6dd9039e7ab9df79))
* **deps:** update dependency @nestjs/cli to v10.0.2 ([#248](https://github.com/UK-Export-Finance/mdm-api/issues/248)) ([d8ed8d6](https://github.com/UK-Export-Finance/mdm-api/commit/d8ed8d605c251c8199561bbc281b81134eb5bb52))
* **deps:** update dependency @nestjs/cli to v10.1.1 ([#278](https://github.com/UK-Export-Finance/mdm-api/issues/278)) ([4f7f2af](https://github.com/UK-Export-Finance/mdm-api/commit/4f7f2af7d16562c494056e9ecc75c8c680625475))
* **deps:** update dependency sort-package-json to v2.5.0 ([#277](https://github.com/UK-Export-Finance/mdm-api/issues/277)) ([944f91c](https://github.com/UK-Export-Finance/mdm-api/commit/944f91c2deee655917f763899d7a6a962c7c6482))
* **deps:** update typescript-eslint monorepo to v5.60.0 ([#254](https://github.com/UK-Export-Finance/mdm-api/issues/254)) ([12b3348](https://github.com/UK-Export-Finance/mdm-api/commit/12b33487ed7acb9b130f88a8b33aeef1e3ca460d))
* **deps:** update typescript-eslint monorepo to v5.60.1 ([#265](https://github.com/UK-Export-Finance/mdm-api/issues/265)) ([594de1b](https://github.com/UK-Export-Finance/mdm-api/commit/594de1b9e639ef6180c3463cb4d4ce5465d9aaf6))

## [1.13.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.12.1...v1.13.0) (2023-05-24)


### Features

* **eslint:** added destructure eslint rule ([#206](https://github.com/UK-Export-Finance/mdm-api/issues/206)) ([8b03027](https://github.com/UK-Export-Finance/mdm-api/commit/8b030275b2fb9f44f8e8a39d445bbebb9cb3bf20))


### Miscellaneous

* **deps-dev:** Bump @nestjs/testing from 9.4.1 to 9.4.2 ([#204](https://github.com/UK-Export-Finance/mdm-api/issues/204)) ([e4cdbc8](https://github.com/UK-Export-Finance/mdm-api/commit/e4cdbc8ba253755cc52e0ad5d37f2adbc406554c))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.6 to 5.59.7 ([#199](https://github.com/UK-Export-Finance/mdm-api/issues/199)) ([b3a4b28](https://github.com/UK-Export-Finance/mdm-api/commit/b3a4b2810d2581c4588f1b819f15cac529f754f4))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.6 to 5.59.7 ([#198](https://github.com/UK-Export-Finance/mdm-api/issues/198)) ([cfe2be1](https://github.com/UK-Export-Finance/mdm-api/commit/cfe2be14be2b2e90646d22ba54b2284adfd35fc8))
* **deps-dev:** Bump ts-loader from 9.4.2 to 9.4.3 ([#203](https://github.com/UK-Export-Finance/mdm-api/issues/203)) ([f8f1384](https://github.com/UK-Export-Finance/mdm-api/commit/f8f138492ffec340672b275a31f4f94ee4ac659b))
* **deps:** Bump @nestjs/common from 9.4.1 to 9.4.2 ([#205](https://github.com/UK-Export-Finance/mdm-api/issues/205)) ([2a3580b](https://github.com/UK-Export-Finance/mdm-api/commit/2a3580b09757658bf4926419cdfc25e893ae9565))
* **deps:** Bump @nestjs/core from 9.4.1 to 9.4.2 ([#202](https://github.com/UK-Export-Finance/mdm-api/issues/202)) ([1ffbbac](https://github.com/UK-Export-Finance/mdm-api/commit/1ffbbac228aa8cab99e42f118e17b9a3d1075274))
* **deps:** Bump @nestjs/platform-express from 9.4.1 to 9.4.2 ([#201](https://github.com/UK-Export-Finance/mdm-api/issues/201)) ([626faa7](https://github.com/UK-Export-Finance/mdm-api/commit/626faa77193d6f48974eaa9d79c59097435abba3))

## [1.12.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.12.0...v1.12.1) (2023-05-22)


### Bug Fixes

* **mdm:** reverted commit 5e1d74 ([#174](https://github.com/UK-Export-Finance/mdm-api/issues/174)) ([362de3c](https://github.com/UK-Export-Finance/mdm-api/commit/362de3c2900e0c40a207e9810838206e126c0881))
* **merge:** dockerflie ([4f88ae9](https://github.com/UK-Export-Finance/mdm-api/commit/4f88ae988016522493a6b177b4a9518935300a89))


### Miscellaneous

* **deps-dev:** Bump @nestjs/cli from 9.4.2 to 9.5.0 ([#192](https://github.com/UK-Export-Finance/mdm-api/issues/192)) ([ffb645a](https://github.com/UK-Export-Finance/mdm-api/commit/ffb645a8760b31f061d9b440e1647eeab67147c2))
* **deps-dev:** Bump @nestjs/schematics from 9.1.0 to 9.2.0 ([#191](https://github.com/UK-Export-Finance/mdm-api/issues/191)) ([77c255d](https://github.com/UK-Export-Finance/mdm-api/commit/77c255d86374909636000d84f88d43c2248d3075))
* **deps-dev:** Bump @nestjs/testing from 9.4.0 to 9.4.1 ([#187](https://github.com/UK-Export-Finance/mdm-api/issues/187)) ([f75d4a8](https://github.com/UK-Export-Finance/mdm-api/commit/f75d4a8f55eabfbc7a0f3dc9f6a0c7a790998b1e))
* **deps-dev:** Bump @types/node from 20.1.3 to 20.1.4 ([#179](https://github.com/UK-Export-Finance/mdm-api/issues/179)) ([6327168](https://github.com/UK-Export-Finance/mdm-api/commit/6327168eb22cead53279cf5dbd308f494a070a1e))
* **deps-dev:** Bump @types/node from 20.1.4 to 20.1.7 ([#189](https://github.com/UK-Export-Finance/mdm-api/issues/189)) ([a39a0aa](https://github.com/UK-Export-Finance/mdm-api/commit/a39a0aa49c315731c95c112bbb1d8f4444c08a9c))
* **deps-dev:** Bump @types/node from 20.1.7 to 20.2.0 ([#190](https://github.com/UK-Export-Finance/mdm-api/issues/190)) ([dde4b78](https://github.com/UK-Export-Finance/mdm-api/commit/dde4b78399ea6a08e27cd2abd7382311f3297246))
* **deps-dev:** Bump @types/node from 20.2.0 to 20.2.1 ([#194](https://github.com/UK-Export-Finance/mdm-api/issues/194)) ([5000906](https://github.com/UK-Export-Finance/mdm-api/commit/500090679ea93615b453f36ce741f87ccb007317))
* **deps-dev:** Bump @types/node from 20.2.1 to 20.2.3 ([#196](https://github.com/UK-Export-Finance/mdm-api/issues/196)) ([3e8b298](https://github.com/UK-Export-Finance/mdm-api/commit/3e8b29859454fb88a2de9a00ca457fde44f09829))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.5 to 5.59.6 ([#183](https://github.com/UK-Export-Finance/mdm-api/issues/183)) ([d7c71bb](https://github.com/UK-Export-Finance/mdm-api/commit/d7c71bba21fb49f8d7aa54b4545b77ff60ecce4c))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.5 to 5.59.6 ([#185](https://github.com/UK-Export-Finance/mdm-api/issues/185)) ([7e42407](https://github.com/UK-Export-Finance/mdm-api/commit/7e424073890a1a32ffdbe8978a834af134259643))
* **deps-dev:** Bump eslint from 8.40.0 to 8.41.0 ([#197](https://github.com/UK-Export-Finance/mdm-api/issues/197)) ([a8d9dce](https://github.com/UK-Export-Finance/mdm-api/commit/a8d9dceb017056b2e8e2fac9d67e404f13fc98b9))
* **deps:** Bump @nestjs/common from 9.4.0 to 9.4.1 ([#181](https://github.com/UK-Export-Finance/mdm-api/issues/181)) ([c4019ab](https://github.com/UK-Export-Finance/mdm-api/commit/c4019ab50edcf1b04f842a2c3f95035a17d7dbfa))
* **deps:** Bump @nestjs/config from 2.3.1 to 2.3.2 ([#188](https://github.com/UK-Export-Finance/mdm-api/issues/188)) ([a74b205](https://github.com/UK-Export-Finance/mdm-api/commit/a74b205fe4a889f3e05567d3f5ba56db5cb5be78))
* **deps:** Bump @nestjs/core from 9.4.0 to 9.4.1 ([#182](https://github.com/UK-Export-Finance/mdm-api/issues/182)) ([5f71ce8](https://github.com/UK-Export-Finance/mdm-api/commit/5f71ce859c212e926ff140c389b0ddaa695c7c48))
* **deps:** Bump @nestjs/platform-express from 9.4.0 to 9.4.1 ([#184](https://github.com/UK-Export-Finance/mdm-api/issues/184)) ([25f5223](https://github.com/UK-Export-Finance/mdm-api/commit/25f5223b0ce60dfaf201ba9fc4ad64c210d09cff))
* **deps:** Bump tslib from 2.5.0 to 2.5.1 ([#193](https://github.com/UK-Export-Finance/mdm-api/issues/193)) ([fdb33ce](https://github.com/UK-Export-Finance/mdm-api/commit/fdb33ceb82127f7db732338c3fb7f68da2185808))
* **deps:** Bump tslib from 2.5.1 to 2.5.2 ([#195](https://github.com/UK-Export-Finance/mdm-api/issues/195)) ([a010283](https://github.com/UK-Export-Finance/mdm-api/commit/a010283370a3d4b4ff79e582155a11aea7551714))
* **deps:** update node.js to v20.2 ([#186](https://github.com/UK-Export-Finance/mdm-api/issues/186)) ([0edcb7d](https://github.com/UK-Export-Finance/mdm-api/commit/0edcb7df28eaa99eb847af57bbb4e49ca661944f))
* only lint once on commit ([#180](https://github.com/UK-Export-Finance/mdm-api/issues/180)) ([cf7c5dc](https://github.com/UK-Export-Finance/mdm-api/commit/cf7c5dce7cdfdc5cfc20646631da8329404d5c96))

## [1.12.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.11.1...v1.12.0) (2023-05-12)


### Features

* **APIM-310:** added new query parameter 'search' to GET /markets ([#167](https://github.com/UK-Export-Finance/mdm-api/issues/167)) ([8476b5c](https://github.com/UK-Export-Finance/mdm-api/commit/8476b5c3a4beda52e61b5a8ab7d6ac6614fa0b35))


### Bug Fixes

* **iac:** added missing argument ([#173](https://github.com/UK-Export-Finance/mdm-api/issues/173)) ([ae86545](https://github.com/UK-Export-Finance/mdm-api/commit/ae865459e3fbae4d9056a55e51b86a05862d3804))


### Miscellaneous

* **deps-dev:** Bump @tsconfig/node20 from 1.0.0 to 1.0.1 ([#169](https://github.com/UK-Export-Finance/mdm-api/issues/169)) ([d137c51](https://github.com/UK-Export-Finance/mdm-api/commit/d137c51c06c029ab753ba7b56ec5b29ffe7cbd92))
* **deps-dev:** Bump @types/node from 20.1.1 to 20.1.2 ([#165](https://github.com/UK-Export-Finance/mdm-api/issues/165)) ([58c5fac](https://github.com/UK-Export-Finance/mdm-api/commit/58c5fac9ed1ff2abc0a50a6ebb7aebbc4b887a33))
* **deps-dev:** Bump @types/node from 20.1.2 to 20.1.3 ([#170](https://github.com/UK-Export-Finance/mdm-api/issues/170)) ([22606c7](https://github.com/UK-Export-Finance/mdm-api/commit/22606c7dddb717d3a1a272f37218706fad3102d6))
* **deps:** Bump typeorm from 0.3.15 to 0.3.16 ([#166](https://github.com/UK-Export-Finance/mdm-api/issues/166)) ([1271818](https://github.com/UK-Export-Finance/mdm-api/commit/1271818213d54d90ab8809b4190243aaa2c210c1))

## [1.11.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.11.0...v1.11.1) (2023-05-09)


### Bug Fixes

* lint fixes based on sonarcloud ([#159](https://github.com/UK-Export-Finance/mdm-api/issues/159)) ([547f468](https://github.com/UK-Export-Finance/mdm-api/commit/547f468f2df39fb0e378693a9b5d19055e5e1d74))


### Miscellaneous

* **deps-dev:** Bump @commitlint/cli from 17.6.1 to 17.6.3 ([#157](https://github.com/UK-Export-Finance/mdm-api/issues/157)) ([0fa2016](https://github.com/UK-Export-Finance/mdm-api/commit/0fa2016b3f13f07d14169aebc276e0e2e143b2c3))
* **deps-dev:** Bump @commitlint/config-conventional from 17.6.1 to 17.6.3 ([#155](https://github.com/UK-Export-Finance/mdm-api/issues/155)) ([62ce765](https://github.com/UK-Export-Finance/mdm-api/commit/62ce765248dda846c590af47885c886598fe824a))
* **deps-dev:** Bump @types/node from 18.16.3 to 20.0.0 ([#156](https://github.com/UK-Export-Finance/mdm-api/issues/156)) ([be7cef0](https://github.com/UK-Export-Finance/mdm-api/commit/be7cef0870f2311b04be491a5bbc068bd9ab939c))
* **deps-dev:** Bump @types/node from 20.0.0 to 20.1.0 ([#161](https://github.com/UK-Export-Finance/mdm-api/issues/161)) ([efe1ebd](https://github.com/UK-Export-Finance/mdm-api/commit/efe1ebdf3b54a9c5ad1dedf0b29cd74d0dd127d1))
* **deps-dev:** Bump @types/node from 20.1.0 to 20.1.1 ([#162](https://github.com/UK-Export-Finance/mdm-api/issues/162)) ([4200de8](https://github.com/UK-Export-Finance/mdm-api/commit/4200de8fb2a3e487b87e6b6980262827ae3c6e7d))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.2 to 5.59.5 ([#163](https://github.com/UK-Export-Finance/mdm-api/issues/163)) ([84fd7ab](https://github.com/UK-Export-Finance/mdm-api/commit/84fd7ab7f8f8e976a4b7458900930bb0b88ea44d))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.2 to 5.59.5 ([#164](https://github.com/UK-Export-Finance/mdm-api/issues/164)) ([a5c19b1](https://github.com/UK-Export-Finance/mdm-api/commit/a5c19b1df215af2ca22cf776cab93cc8c73aef60))
* **deps-dev:** Bump eslint from 8.39.0 to 8.40.0 ([#160](https://github.com/UK-Export-Finance/mdm-api/issues/160)) ([3cc7d44](https://github.com/UK-Export-Finance/mdm-api/commit/3cc7d4457bff85cf04720416a6ccfd08bcd57fb5))
* **deps:** update node.js to v20.1 ([#153](https://github.com/UK-Export-Finance/mdm-api/issues/153)) ([e54aced](https://github.com/UK-Export-Finance/mdm-api/commit/e54aced965ad612d038bfae2c714485c3b1cb7c0))

## [1.11.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.10.2...v1.11.0) (2023-05-03)


### Features

* **staging:** staging environment deployment ([#151](https://github.com/UK-Export-Finance/mdm-api/issues/151)) ([b79b65a](https://github.com/UK-Export-Finance/mdm-api/commit/b79b65afd61e3d1845b6089d7cd7752298651ad4))


### Bug Fixes

* **APIM-194:** fixed the `oecdRiskCategory` differences  in `/markets` endpoint ([#147](https://github.com/UK-Export-Finance/mdm-api/issues/147)) ([1027701](https://github.com/UK-Export-Finance/mdm-api/commit/102770154918c9cf0e315e7c8d2fd24efa645491))
* **deployment:** generic deployment script ([#152](https://github.com/UK-Export-Finance/mdm-api/issues/152)) ([dedd746](https://github.com/UK-Export-Finance/mdm-api/commit/dedd7467d8c096de9919f83f9bb18e839c78bebd))
* **revision:** revision suffix to refer to run_id ([#143](https://github.com/UK-Export-Finance/mdm-api/issues/143)) ([8e371b7](https://github.com/UK-Export-Finance/mdm-api/commit/8e371b7a7a3a34a02b65c757fa7749dc38b792ad))


### Miscellaneous

* **deps-dev:** Bump @nestjs/cli from 9.4.1 to 9.4.2 ([#136](https://github.com/UK-Export-Finance/mdm-api/issues/136)) ([c857830](https://github.com/UK-Export-Finance/mdm-api/commit/c857830d7d077e9d37c3624469d7c966618740ea))
* **deps-dev:** Bump @types/node from 18.16.0 to 18.16.1 ([#139](https://github.com/UK-Export-Finance/mdm-api/issues/139)) ([2d2b229](https://github.com/UK-Export-Finance/mdm-api/commit/2d2b2290cc8a386cfeffacdf53627f04a5d9f0f8))
* **deps-dev:** Bump @types/node from 18.16.1 to 18.16.2 ([#144](https://github.com/UK-Export-Finance/mdm-api/issues/144)) ([b6d2a35](https://github.com/UK-Export-Finance/mdm-api/commit/b6d2a35586bbbee4ba074b4f727a9e5af56631ee))
* **deps-dev:** Bump @types/node from 18.16.2 to 18.16.3 ([#146](https://github.com/UK-Export-Finance/mdm-api/issues/146)) ([2622b16](https://github.com/UK-Export-Finance/mdm-api/commit/2622b16699138beffa35ce66aa341b6d7cabc87e))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.0 to 5.59.1 ([#135](https://github.com/UK-Export-Finance/mdm-api/issues/135)) ([2f21863](https://github.com/UK-Export-Finance/mdm-api/commit/2f21863b8c35d079feb5973b5ed7d6ba2f3c06a8))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.59.1 to 5.59.2 ([#149](https://github.com/UK-Export-Finance/mdm-api/issues/149)) ([1292c9d](https://github.com/UK-Export-Finance/mdm-api/commit/1292c9de498a15b29b3df0e76747ce15c062501e))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.0 to 5.59.1 ([#134](https://github.com/UK-Export-Finance/mdm-api/issues/134)) ([91876ba](https://github.com/UK-Export-Finance/mdm-api/commit/91876ba3025252c86bcbc641f38fda0637671a99))
* **deps-dev:** Bump @typescript-eslint/parser from 5.59.1 to 5.59.2 ([#150](https://github.com/UK-Export-Finance/mdm-api/issues/150)) ([2b95ca2](https://github.com/UK-Export-Finance/mdm-api/commit/2b95ca295ff626873e966c4470a148ef9b984bcd))
* **deps-dev:** Bump lint-staged from 13.2.1 to 13.2.2 ([#140](https://github.com/UK-Export-Finance/mdm-api/issues/140)) ([3677717](https://github.com/UK-Export-Finance/mdm-api/commit/3677717a9bd7651449dc7360e0dd20d6f67b7548))
* **deps:** Bump date-fns from 2.29.3 to 2.30.0 ([#145](https://github.com/UK-Export-Finance/mdm-api/issues/145)) ([f6250f7](https://github.com/UK-Export-Finance/mdm-api/commit/f6250f7c023181364fe72689aa687978b7d79b33))
* **deps:** Bump nestjs-pino from 3.1.3 to 3.2.0 ([#141](https://github.com/UK-Export-Finance/mdm-api/issues/141)) ([45947c7](https://github.com/UK-Export-Finance/mdm-api/commit/45947c75d8997a0392483a1246e4dc598482aeab))
* **deps:** Bump rxjs from 7.8.0 to 7.8.1 ([#142](https://github.com/UK-Export-Finance/mdm-api/issues/142)) ([fb8f819](https://github.com/UK-Export-Finance/mdm-api/commit/fb8f819878c9ec872fb7dc194b2def6bf7674519))
* **deps:** Bump typeorm-extension from 2.7.0 to 2.8.0 ([#148](https://github.com/UK-Export-Finance/mdm-api/issues/148)) ([541071f](https://github.com/UK-Export-Finance/mdm-api/commit/541071fcc135d1f4278fa34f5791ac139ddf282e))
* **deps:** Bump yaml from 2.2.1 to 2.2.2 ([#138](https://github.com/UK-Export-Finance/mdm-api/issues/138)) ([b0f314e](https://github.com/UK-Export-Finance/mdm-api/commit/b0f314e79cb0f3a48ceeb1f8e6e3114d6d749ac2))

## [1.10.2](https://github.com/UK-Export-Finance/mdm-api/compare/v1.10.1...v1.10.2) (2023-04-24)


### Miscellaneous

* **deps-dev:** Bump @types/node from 18.15.13 to 18.16.0 ([#132](https://github.com/UK-Export-Finance/mdm-api/issues/132)) ([d858559](https://github.com/UK-Export-Finance/mdm-api/commit/d858559a9d5a0f589bc864587ac10bd538d23e7d))
* **deps-dev:** Bump eslint from 8.38.0 to 8.39.0 ([#130](https://github.com/UK-Export-Finance/mdm-api/issues/130)) ([b550a4e](https://github.com/UK-Export-Finance/mdm-api/commit/b550a4e6a4a0f94288c5869f95f08ac93e48f866))
* **deps-dev:** Bump prettier from 2.8.7 to 2.8.8 ([#131](https://github.com/UK-Export-Finance/mdm-api/issues/131)) ([9143a5d](https://github.com/UK-Export-Finance/mdm-api/commit/9143a5d0436335094374080918dedbf8e05ec0d3))

## [1.10.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.10.0...v1.10.1) (2023-04-21)


### Documentation

* **gha:** improved GHA documentation ([#115](https://github.com/UK-Export-Finance/mdm-api/issues/115)) ([d9a3e75](https://github.com/UK-Export-Finance/mdm-api/commit/d9a3e7541ec1da4314ef88408f2489095d060556))


### Miscellaneous

* **deps-dev:** Bump @nestjs/cli from 9.4.0 to 9.4.1 ([#129](https://github.com/UK-Export-Finance/mdm-api/issues/129)) ([b75435c](https://github.com/UK-Export-Finance/mdm-api/commit/b75435c929c1db5d6b4c512b15b27c793247c7ec))
* **deps-dev:** Bump @tsconfig/node18 from 1.0.1 to 1.0.2 ([a773103](https://github.com/UK-Export-Finance/mdm-api/commit/a773103f73e4201efe5315de2beb28bb63599a7f))
* **deps-dev:** Bump @tsconfig/node18 from 1.0.1 to 1.0.2 ([#118](https://github.com/UK-Export-Finance/mdm-api/issues/118)) ([9a0988f](https://github.com/UK-Export-Finance/mdm-api/commit/9a0988fae15d876ea2fff54c7bf3dbb67308bc5f))
* **deps-dev:** Bump @tsconfig/node18 from 1.0.2 to 2.0.0 ([#122](https://github.com/UK-Export-Finance/mdm-api/issues/122)) ([611e3ab](https://github.com/UK-Export-Finance/mdm-api/commit/611e3ab5945442a5c92c3c50eb56ee30bccb39c2))
* **deps-dev:** Bump @types/node from 18.15.11 to 18.15.12 ([#124](https://github.com/UK-Export-Finance/mdm-api/issues/124)) ([d931da1](https://github.com/UK-Export-Finance/mdm-api/commit/d931da148a9791d2e5d938f6ff29bfdd5d616436))
* **deps-dev:** Bump @types/node from 18.15.12 to 18.15.13 ([#127](https://github.com/UK-Export-Finance/mdm-api/issues/127)) ([d7ca882](https://github.com/UK-Export-Finance/mdm-api/commit/d7ca882236181655f79c4680c12d773368988bef))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.58.0 to 5.59.0 ([#119](https://github.com/UK-Export-Finance/mdm-api/issues/119)) ([c2f430d](https://github.com/UK-Export-Finance/mdm-api/commit/c2f430de96570ef588ea920be4685992968320a1))
* **deps-dev:** Bump @typescript-eslint/parser from 5.58.0 to 5.59.0 ([9492505](https://github.com/UK-Export-Finance/mdm-api/commit/9492505af6a63178bfe4e2d97968fbf59b6a2d63))
* **deps-dev:** Bump @typescript-eslint/parser from 5.58.0 to 5.59.0 ([#120](https://github.com/UK-Export-Finance/mdm-api/issues/120)) ([107b330](https://github.com/UK-Export-Finance/mdm-api/commit/107b33032b37e2433f761bc8ce1067b00dfead3b))
* **deps:** Bump nestjs-pino from 3.1.2 to 3.1.3 ([#125](https://github.com/UK-Export-Finance/mdm-api/issues/125)) ([9492b9b](https://github.com/UK-Export-Finance/mdm-api/commit/9492b9b24dd9d50c6214b13479172b1815a59a0d))
* **deps:** Bump typeorm from 0.3.14 to 0.3.15 ([#114](https://github.com/UK-Export-Finance/mdm-api/issues/114)) ([4339870](https://github.com/UK-Export-Finance/mdm-api/commit/4339870238c4977ec18c5b1e108e3df895ff76bb))
* **deps:** update dependency @tsconfig/node18 to v2 ([#121](https://github.com/UK-Export-Finance/mdm-api/issues/121)) ([fbf45d9](https://github.com/UK-Export-Finance/mdm-api/commit/fbf45d93b64f85de6128778058ca5d971754ace3))
* **deps:** update dependency @types/jest to v29.5.1 ([#123](https://github.com/UK-Export-Finance/mdm-api/issues/123)) ([f98b0a1](https://github.com/UK-Export-Finance/mdm-api/commit/f98b0a1532c0a1f1ee4d8fc69d72f5d61930ffa9))
* **deps:** update node.js to v20 ([#126](https://github.com/UK-Export-Finance/mdm-api/issues/126)) ([56f24d0](https://github.com/UK-Export-Finance/mdm-api/commit/56f24d028a52a82b70ebb5e9e084c86d39a55874))
* **lint:** lint fixes + consistent naming convention ([#117](https://github.com/UK-Export-Finance/mdm-api/issues/117)) ([d12dbde](https://github.com/UK-Export-Finance/mdm-api/commit/d12dbde792379e396a74ef8485c8f957cdb1b437))

## [1.10.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.9.0...v1.10.0) (2023-04-14)


### Features

* **APIM-162:** API management instance ([#78](https://github.com/UK-Export-Finance/mdm-api/issues/78)) ([225737b](https://github.com/UK-Export-Finance/mdm-api/commit/225737b33bfd48008a8981adc12b975bb482549c))


### Bug Fixes

* **APIM-197:** fixed currency exchange issues ([#107](https://github.com/UK-Export-Finance/mdm-api/issues/107)) ([9165c49](https://github.com/UK-Export-Finance/mdm-api/commit/9165c498e09d07e0b4b9aed951092c09b4550db2))
* bug apim-203 added specification parameter to make optional fields optional in spec ([addec9d](https://github.com/UK-Export-Finance/mdm-api/commit/addec9d5aaf74275ed59151c1066ad57a7f3ed4e))
* bug apim-203 make optional fields optional in spec ([#113](https://github.com/UK-Export-Finance/mdm-api/issues/113)) ([334e6ef](https://github.com/UK-Export-Finance/mdm-api/commit/334e6efc8d4c78bfb9517e36fe11c1487b318fe7))


### Miscellaneous

* **deps-dev:** Bump @commitlint/cli from 17.5.1 to 17.6.0 ([#111](https://github.com/UK-Export-Finance/mdm-api/issues/111)) ([244a575](https://github.com/UK-Export-Finance/mdm-api/commit/244a575570cb8fb420167654c6f1282b4f60b4cd))
* **deps-dev:** Bump @commitlint/config-conventional from 17.4.4 to 17.6.0 ([#110](https://github.com/UK-Export-Finance/mdm-api/issues/110)) ([3c677f3](https://github.com/UK-Export-Finance/mdm-api/commit/3c677f3054020163757b605247b7e1a799015b80))
* **deps-dev:** Bump @nestjs/cli from 9.3.0 to 9.4.0 ([#112](https://github.com/UK-Export-Finance/mdm-api/issues/112)) ([fc14e74](https://github.com/UK-Export-Finance/mdm-api/commit/fc14e747e367f714c090b0e74e39c6ff42ca00fb))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin from 5.57.1 to 5.58.0 ([#105](https://github.com/UK-Export-Finance/mdm-api/issues/105)) ([bcfeb18](https://github.com/UK-Export-Finance/mdm-api/commit/bcfeb18650ad2cba97728e139a5210cca5c66a05))
* **deps-dev:** Bump @typescript-eslint/parser from 5.57.1 to 5.58.0 ([#106](https://github.com/UK-Export-Finance/mdm-api/issues/106)) ([28bbed6](https://github.com/UK-Export-Finance/mdm-api/commit/28bbed6afd156542061f646fa44153c574cd9b48))
* **deps-dev:** bump eslint from 8.37.0 to 8.38.0 ([#101](https://github.com/UK-Export-Finance/mdm-api/issues/101)) ([1033d02](https://github.com/UK-Export-Finance/mdm-api/commit/1033d020d08e14dc7665493a8bcedf9490903b9f))
* **deps-dev:** bump lint-staged from 13.2.0 to 13.2.1 ([#103](https://github.com/UK-Export-Finance/mdm-api/issues/103)) ([f1c287c](https://github.com/UK-Export-Finance/mdm-api/commit/f1c287cf4dc7345527b4ce4ba804787c191a3312))
* **deps:** bump typeorm from 0.3.12 to 0.3.13 ([#98](https://github.com/UK-Export-Finance/mdm-api/issues/98)) ([e3d85b9](https://github.com/UK-Export-Finance/mdm-api/commit/e3d85b95e8f88a86aadab5f22e7b71bba8788734))
* **deps:** bump typeorm from 0.3.13 to 0.3.14 ([#102](https://github.com/UK-Export-Finance/mdm-api/issues/102)) ([719d738](https://github.com/UK-Export-Finance/mdm-api/commit/719d73858064955c1497c3c27d13bc1818961649))
* **deps:** bump typescript from 5.0.3 to 5.0.4 ([#104](https://github.com/UK-Export-Finance/mdm-api/issues/104)) ([4995c24](https://github.com/UK-Export-Finance/mdm-api/commit/4995c2421e86449e3240f75061f6150e0bbecc38))
* **deps:** update node.js to v19.9 ([#108](https://github.com/UK-Export-Finance/mdm-api/issues/108)) ([874010c](https://github.com/UK-Export-Finance/mdm-api/commit/874010c6405db0ec388d3328fd0d33dc5d09afe7))

## [1.9.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.8.0...v1.9.0) (2023-04-06)


### Features

* adding authentication header to swagger ui, removing wrong auth… ([#82](https://github.com/UK-Export-Finance/mdm-api/issues/82)) ([d8d50d9](https://github.com/UK-Export-Finance/mdm-api/commit/d8d50d96738e9c26d234598547eca43dd3e6f58e))
* **dependabot:** added dependabot.yml GHA ([84c3ca8](https://github.com/UK-Export-Finance/mdm-api/commit/84c3ca82eec63b6d90ad758f9e0e2272d11ea0eb))


### Bug Fixes

* **deployment:** updated branch names ([#69](https://github.com/UK-Export-Finance/mdm-api/issues/69)) ([f1b6b8f](https://github.com/UK-Export-Finance/mdm-api/commit/f1b6b8f5fcd4a9cb0d59400f0dfc4e1c3c1b1091))


### Miscellaneous

* **deps-dev:** bump @commitlint/cli from 17.5.0 to 17.5.1 ([#81](https://github.com/UK-Export-Finance/mdm-api/issues/81)) ([8f3c0bb](https://github.com/UK-Export-Finance/mdm-api/commit/8f3c0bb63f29ed78e2eeda15dd1e02d6f7aa916a))
* **deps-dev:** bump @nestjs/schematics from 9.0.4 to 9.1.0 ([#84](https://github.com/UK-Export-Finance/mdm-api/issues/84)) ([dabf562](https://github.com/UK-Export-Finance/mdm-api/commit/dabf562156aead2cd4d9fd5b5e32e4712ce46983))
* **deps-dev:** bump @types/node from 18.15.10 to 18.15.11 ([#76](https://github.com/UK-Export-Finance/mdm-api/issues/76)) ([b831d96](https://github.com/UK-Export-Finance/mdm-api/commit/b831d96c4353358961f234995acb9871a6ccf4a0))
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.56.0 to 5.57.0 ([#74](https://github.com/UK-Export-Finance/mdm-api/issues/74)) ([5b5ee21](https://github.com/UK-Export-Finance/mdm-api/commit/5b5ee21dca6be526efae8be4b04acb78f3270416))
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.57.0 to 5.57.1 ([#90](https://github.com/UK-Export-Finance/mdm-api/issues/90)) ([cc0c6ac](https://github.com/UK-Export-Finance/mdm-api/commit/cc0c6acf789df215623a9acb4b745fea18864a38))
* **deps-dev:** bump @typescript-eslint/parser from 5.56.0 to 5.57.0 ([#77](https://github.com/UK-Export-Finance/mdm-api/issues/77)) ([9553492](https://github.com/UK-Export-Finance/mdm-api/commit/955349298ec0a36bd60707e4cdc3811e78348aef))
* **deps-dev:** bump @typescript-eslint/parser from 5.57.0 to 5.57.1 ([#91](https://github.com/UK-Export-Finance/mdm-api/issues/91)) ([d68c468](https://github.com/UK-Export-Finance/mdm-api/commit/d68c468a79eac6ca61648d234b4c248cc00cd854))
* **deps-dev:** bump eslint from 8.36.0 to 8.37.0 ([#75](https://github.com/UK-Export-Finance/mdm-api/issues/75)) ([385c1b4](https://github.com/UK-Export-Finance/mdm-api/commit/385c1b49351e569695b5a88403904bb0ab5f7dd8))
* **deps-dev:** bump eslint-import-resolver-typescript from 3.5.3 to 3.5.4 ([#79](https://github.com/UK-Export-Finance/mdm-api/issues/79)) ([5fa828e](https://github.com/UK-Export-Finance/mdm-api/commit/5fa828eec8c2af8772a1abd9843db76babd4164e))
* **deps-dev:** bump eslint-plugin-deprecation from 1.3.3 to 1.4.0 ([#87](https://github.com/UK-Export-Finance/mdm-api/issues/87)) ([b2c2855](https://github.com/UK-Export-Finance/mdm-api/commit/b2c285576e38546989370285d14abc5a5b1fcd1d))
* **deps-dev:** bump ts-jest from 29.0.5 to 29.1.0 ([#86](https://github.com/UK-Export-Finance/mdm-api/issues/86)) ([240c958](https://github.com/UK-Export-Finance/mdm-api/commit/240c9586d0e902449cc8d59d3c90155bd9757749))
* **deps:** bump @nestjs/swagger from 6.2.1 to 6.3.0 ([#89](https://github.com/UK-Export-Finance/mdm-api/issues/89)) ([bb6c874](https://github.com/UK-Export-Finance/mdm-api/commit/bb6c8749e4bed42a14d42dc4f0307a731329b9f7))
* **deps:** bump @nestjs/terminus from 9.2.1 to 9.2.2 ([#73](https://github.com/UK-Export-Finance/mdm-api/issues/73)) ([6cb9bb5](https://github.com/UK-Export-Finance/mdm-api/commit/6cb9bb5fe05f6b23f120f94ee0fcc5b48cc53f99))
* **deps:** bump tsconfig-paths from 4.1.2 to 4.2.0 ([#80](https://github.com/UK-Export-Finance/mdm-api/issues/80)) ([99f0d62](https://github.com/UK-Export-Finance/mdm-api/commit/99f0d624d6e3af131b5eedd9bba13af0296860b3))
* **deps:** bump typeorm-extension from 2.6.2 to 2.7.0 ([#88](https://github.com/UK-Export-Finance/mdm-api/issues/88)) ([c0df8c9](https://github.com/UK-Export-Finance/mdm-api/commit/c0df8c933a4db5a6d6b391998eb1ff047ec1dd6b))
* **deps:** bump typescript from 5.0.2 to 5.0.3 ([#83](https://github.com/UK-Export-Finance/mdm-api/issues/83)) ([d4b2fdc](https://github.com/UK-Export-Finance/mdm-api/commit/d4b2fdcf1ec6f90352cc98a56a1b93762fa8eb8c))
* **deps:** update all ([#68](https://github.com/UK-Export-Finance/mdm-api/issues/68)) ([ea0fcd3](https://github.com/UK-Export-Finance/mdm-api/commit/ea0fcd33d73c2242bc78d7e1c856bd6447d2fbb2))

## [1.8.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.7.0...v1.8.0) (2023-03-27)


### Features

* **APIM-149:** APIM IaC ([#58](https://github.com/UK-Export-Finance/mdm-api/issues/58)) ([78663ce](https://github.com/UK-Export-Finance/mdm-api/commit/78663ce899b634b38a011431f18f2b9520e98f6e))


### Bug Fixes

* **CVE-2023-28154:** webpack updated to 5.76.2 ([#61](https://github.com/UK-Export-Finance/mdm-api/issues/61)) ([97e9380](https://github.com/UK-Export-Finance/mdm-api/commit/97e938043a708fbb4297b804c0366582fd60b18e))
* **deps:** update dependency pino-pretty to v10 ([b07bb5d](https://github.com/UK-Export-Finance/mdm-api/commit/b07bb5d0cadcb290539716de2b0139109e3b4de8))
* **deps:** update dependency pino-pretty to v10 ([#54](https://github.com/UK-Export-Finance/mdm-api/issues/54)) ([ac0bb48](https://github.com/UK-Export-Finance/mdm-api/commit/ac0bb4824d4758617eff547a4e35c1b3d36d7b92))
* **deps:** update dependency typescript to v5 ([#60](https://github.com/UK-Export-Finance/mdm-api/issues/60)) ([4f9ade5](https://github.com/UK-Export-Finance/mdm-api/commit/4f9ade5902362f2721ef82e7a3aaf574335acf38))


### Miscellaneous

* **deps:** update all NPM packages ([#51](https://github.com/UK-Export-Finance/mdm-api/issues/51)) ([3959eec](https://github.com/UK-Export-Finance/mdm-api/commit/3959eec3ed3dcf6068d158a46ecc4c8ef8947942))
* **deps:** update dependency @types/jest to v29.4.1 ([9377f2f](https://github.com/UK-Export-Finance/mdm-api/commit/9377f2f6f7b62e52069f763876ca67ca5e55ce61))
* **deps:** update dependency @types/jest to v29.4.1 ([#53](https://github.com/UK-Export-Finance/mdm-api/issues/53)) ([4d6572d](https://github.com/UK-Export-Finance/mdm-api/commit/4d6572d02dcf045b640dabb0e6528bd9112bb613))
* **deps:** update dependency @types/jest to v29.5.0 ([#59](https://github.com/UK-Export-Finance/mdm-api/issues/59)) ([31efdce](https://github.com/UK-Export-Finance/mdm-api/commit/31efdce8b47e68e7a2be84503bf30e7b8d35c63e))
* **deps:** update szenius/set-timezone action to v1.2 ([#62](https://github.com/UK-Export-Finance/mdm-api/issues/62)) ([4a6a220](https://github.com/UK-Export-Finance/mdm-api/commit/4a6a2202326c8b529eab323c68a4a7c0ade51f64))
* **npm-update:** dependencies updates ([#63](https://github.com/UK-Export-Finance/mdm-api/issues/63)) ([edb908d](https://github.com/UK-Export-Finance/mdm-api/commit/edb908dab55a40cb497832177a931449d8581cf2))
* **npm-update:** dependency update ([39c709b](https://github.com/UK-Export-Finance/mdm-api/commit/39c709be2961298a6cbecf1ed3066cea1a8be2a4))
* **npm-update:** dependency update ([#57](https://github.com/UK-Export-Finance/mdm-api/issues/57)) ([2dde79b](https://github.com/UK-Export-Finance/mdm-api/commit/2dde79bd931063d6535cbfa8a77a0a87760b43f0))

## [1.7.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.6.0...v1.7.0) (2023-03-10)


### Features

* added authentication using API Key ([#44](https://github.com/UK-Export-Finance/mdm-api/issues/44)) ([29340ef](https://github.com/UK-Export-Finance/mdm-api/commit/29340ef413aa13bed6eb80cc6ca702bc074fb74d))
* added GET `/currencies`, `/currencies/{isoCode}` and `/currencies/exchange` endpoints ([#40](https://github.com/UK-Export-Finance/mdm-api/issues/40)) ([8cf909e](https://github.com/UK-Export-Finance/mdm-api/commit/8cf909e822563b206909fc68ffeb100ef4289964))
* **APIM-151:** global enum introduction ([#49](https://github.com/UK-Export-Finance/mdm-api/issues/49)) ([23ba2fa](https://github.com/UK-Export-Finance/mdm-api/commit/23ba2facf4827259a165af747bffe4e2ba2694c2))
* **APIM-90-91:** post and get premium schedules ([#45](https://github.com/UK-Export-Finance/mdm-api/issues/45)) ([ee4842c](https://github.com/UK-Export-Finance/mdm-api/commit/ee4842c20f3074ada7dac58fc5a912a07726d6c8))
* **APIM-96:** added GET `/yield-rates` endpoint ([#50](https://github.com/UK-Export-Finance/mdm-api/issues/50)) ([5f0e318](https://github.com/UK-Export-Finance/mdm-api/commit/5f0e3180d87793ad0785028ac5a77fd2515da19b))


### Bug Fixes

* **deps:** update dependency tsconfig-paths to v4 ([#43](https://github.com/UK-Export-Finance/mdm-api/issues/43)) ([218af2f](https://github.com/UK-Export-Finance/mdm-api/commit/218af2f2319af45931a3dc705c86c1540d481252))


### Miscellaneous

* **deps:** update dependency jest to v29.5.0 ([#48](https://github.com/UK-Export-Finance/mdm-api/issues/48)) ([93122d7](https://github.com/UK-Export-Finance/mdm-api/commit/93122d773d10deeb91aba8e6cccaa101f75459d3))
* **deps:** updated all NPM packages ([#41](https://github.com/UK-Export-Finance/mdm-api/issues/41)) ([5d7952c](https://github.com/UK-Export-Finance/mdm-api/commit/5d7952caf1f142e1e033c6461f81310d6d5572f7))
* **npm-update:** dependencies update ([#47](https://github.com/UK-Export-Finance/mdm-api/issues/47)) ([c7ed54e](https://github.com/UK-Export-Finance/mdm-api/commit/c7ed54e97e82f97c4649a1caea40d577010f6890))

## [1.6.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.5.0...v1.6.0) (2023-02-24)


### Features

* **API-83:** GET `/constants/spi` ([#38](https://github.com/UK-Export-Finance/mdm-api/issues/38)) ([689c424](https://github.com/UK-Export-Finance/mdm-api/commit/689c424f9d64937b34e001c769f7bde44a68935b))
* new endpoint GET `/exposure-period` ([#39](https://github.com/UK-Export-Finance/mdm-api/issues/39)) ([71344f3](https://github.com/UK-Export-Finance/mdm-api/commit/71344f347b1790f40e4fa01888b17bd427f28418))


### Miscellaneous

* **deps:** update szenius/set-timezone action to v1.1 ([2697267](https://github.com/UK-Export-Finance/mdm-api/commit/26972672ccf38133e0b1185d7574fac33595ca1b))
* **deps:** update szenius/set-timezone action to v1.1 ([#36](https://github.com/UK-Export-Finance/mdm-api/issues/36)) ([e5a52ac](https://github.com/UK-Export-Finance/mdm-api/commit/e5a52acb0765d96e412abb0bf4ae0a2c3c8d1448))

## [1.5.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.4.0...v1.5.0) (2023-02-23)


### Features

* added GET `/sector-industries` endpoint ([#30](https://github.com/UK-Export-Finance/mdm-api/issues/30)) ([67d8a92](https://github.com/UK-Export-Finance/mdm-api/commit/67d8a92770dd86f8b5c73e658ecf0e132b72a455))
* **API-97:** Centralised constants ([#34](https://github.com/UK-Export-Finance/mdm-api/issues/34)) ([1720ba7](https://github.com/UK-Export-Finance/mdm-api/commit/1720ba7563b716f024be5685b8f58a6a3f80d610))
* get sector industries, old endpoint was GET /map-industry-sector ([17ca19f](https://github.com/UK-Export-Finance/mdm-api/commit/17ca19f68801c31afd1f0a59826090ad4c25da80))
* **unit-test:** Unit testing on GHA ([#28](https://github.com/UK-Export-Finance/mdm-api/issues/28)) ([fd15ee4](https://github.com/UK-Export-Finance/mdm-api/commit/fd15ee42a8b068536ad76b308f008b63b8413712))


### Bug Fixes

* **API-82:** Consistent testing approach ([#31](https://github.com/UK-Export-Finance/mdm-api/issues/31)) ([5f2aa6e](https://github.com/UK-Export-Finance/mdm-api/commit/5f2aa6eb41af4a61408048ad4a1ffccaeff7f7b1))
* fix test preparation ([50f2dc6](https://github.com/UK-Export-Finance/mdm-api/commit/50f2dc690422c48a956fe3e1d2248255bf6498b6))
* sector-industry code improvements based on PR comments ([5da452c](https://github.com/UK-Export-Finance/mdm-api/commit/5da452c661b16ac0d13536ecd23c5e3fc7f4ea63))

## [1.4.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.3.1...v1.4.0) (2023-02-21)


### Features

* ensure new ids are in order ([cb3981f](https://github.com/UK-Export-Finance/mdm-api/commit/cb3981f28c485658fbc7c7fda2c1d3664d334dec))
* ensure new ids are in order ([#20](https://github.com/UK-Export-Finance/mdm-api/issues/20)) ([fac35c4](https://github.com/UK-Export-Finance/mdm-api/commit/fac35c4d043fdd84b0d986f4bf77f9a777198605))
* make markets API tests more generic ([#27](https://github.com/UK-Export-Finance/mdm-api/issues/27)) ([5447121](https://github.com/UK-Export-Finance/mdm-api/commit/54471212c9e9e645593a7e986b2fe5a0654e6f1c))


### Bug Fixes

* extra check DB response ([8f4aa41](https://github.com/UK-Export-Finance/mdm-api/commit/8f4aa4151cf31b7c89ea36f03395fb438216b0f4))
* lint error ([f334fb4](https://github.com/UK-Export-Finance/mdm-api/commit/f334fb4e6ea0b646bc6a5b29afca9991254e7de9))
* **POST-number--ids-should-be-sorted:** Added npm ci before lint execution ([7276ff7](https://github.com/UK-Export-Finance/mdm-api/commit/7276ff73553ab87e478319299e4ee529c926545b))
* removed GET `/number-types` endpoint ([#25](https://github.com/UK-Export-Finance/mdm-api/issues/25)) ([683d88e](https://github.com/UK-Export-Finance/mdm-api/commit/683d88ea931d8e1d9a8ca9a1b78273708d1b10eb))

## [1.3.1](https://github.com/UK-Export-Finance/mdm-api/compare/v1.3.0...v1.3.1) (2023-02-20)


### Miscellaneous

* **deps:** update szenius/set-timezone action to v1.1 ([#23](https://github.com/UK-Export-Finance/mdm-api/issues/23)) ([51e88c0](https://github.com/UK-Export-Finance/mdm-api/commit/51e88c0c095221055edbcc6f688a2560b8c5d844))

## [1.3.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.2.0...v1.3.0) (2023-02-20)


### Features

* **API-82:** Improved GHA ([#21](https://github.com/UK-Export-Finance/mdm-api/issues/21)) ([217b682](https://github.com/UK-Export-Finance/mdm-api/commit/217b682cd72b376baa94076d73e9a455dac08538))

## [1.2.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.1.0...v1.2.0) (2023-02-20)


### Features

* **API-69:** added `/interest-rates` endpoint ([#17](https://github.com/UK-Export-Finance/mdm-api/issues/17)) ([ee7a5f5](https://github.com/UK-Export-Finance/mdm-api/commit/ee7a5f51b6e87db99350de699820bc1ac8b5b06e))


### Miscellaneous

* **npm-update:** Package update + NPM minimum version requirement ([a8277b8](https://github.com/UK-Export-Finance/mdm-api/commit/a8277b83b594cef77450c47548bedcc551971be9))
* **npm-update:** Package updates ([#18](https://github.com/UK-Export-Finance/mdm-api/issues/18)) ([fe1085d](https://github.com/UK-Export-Finance/mdm-api/commit/fe1085d777a97713bb2e057ba9520e3fdd60fc36))

## [1.1.0](https://github.com/UK-Export-Finance/mdm-api/compare/v1.0.0...v1.1.0) (2023-02-17)


### Features

* added `cspell`, custom paths, lint staged files & updated all npm packages ([#11](https://github.com/UK-Export-Finance/mdm-api/issues/11)) ([193b128](https://github.com/UK-Export-Finance/mdm-api/commit/193b1283636805284043df7e484e221b539c6e90))
* added API tests for `GET` `/numbers` and `GET` `/number-types` ([#16](https://github.com/UK-Export-Finance/mdm-api/issues/16)) ([dbe6af4](https://github.com/UK-Export-Finance/mdm-api/commit/dbe6af47c0599bbec67fed4d4ce1630a6af90926))
* added tests for GET `/markets` ([#10](https://github.com/UK-Export-Finance/mdm-api/issues/10)) ([2be0006](https://github.com/UK-Export-Finance/mdm-api/commit/2be0006d15b17f21dcac5857508aec536280a26b))
* e2e test expected results WIP ([85d82ec](https://github.com/UK-Export-Finance/mdm-api/commit/85d82ec1f9b44771c0f731a08e200b8c28a90830))
* e2e tests for GET markets ([0e5de5c](https://github.com/UK-Export-Finance/mdm-api/commit/0e5de5ce5276ed5a8e8758d6949f6cdc11871f78))
* number-generator e2e tests, WIP ([b229d6e](https://github.com/UK-Export-Finance/mdm-api/commit/b229d6e7ddf6d3ce6574cccefea53b114ef31da1))


### Bug Fixes

* added path aliases to jest api tests, fixed spelling ([#14](https://github.com/UK-Export-Finance/mdm-api/issues/14)) ([0af68dd](https://github.com/UK-Export-Finance/mdm-api/commit/0af68dd000d35781d38a38501f0f46d3df327d0b))
* simplify empty array check ([bde1444](https://github.com/UK-Export-Finance/mdm-api/commit/bde14441193ddd4aecc2e933fb2a7df32f6f5b19))


### Miscellaneous

* **deps:** update dependency jest to v29.4.3 ([#15](https://github.com/UK-Export-Finance/mdm-api/issues/15)) ([ed2e241](https://github.com/UK-Export-Finance/mdm-api/commit/ed2e241057d6e4e84b8359f236117b95481f84c3))
* updated the `healthcheck` endpoints ([#13](https://github.com/UK-Export-Finance/mdm-api/issues/13)) ([8c1daeb](https://github.com/UK-Export-Finance/mdm-api/commit/8c1daeb70f89acfae1e99eae4a79b3627678a1e4))

## 1.0.0 (2023-02-08)


### Features

* add MDM databases, number generator, market and healthchecks ([#1](https://github.com/UK-Export-Finance/mdm-api/issues/1)) ([03cb77f](https://github.com/UK-Export-Finance/mdm-api/commit/03cb77f2cf19b8201da245a63842d759301b5f1f))
* added `pinojs` logging ([#8](https://github.com/UK-Export-Finance/mdm-api/issues/8)) ([f8fbceb](https://github.com/UK-Export-Finance/mdm-api/commit/f8fbceb2d92d7e8d93d5802f2d70376e9dcf13c9))


### Bug Fixes

* removed `Redis` cache ([#9](https://github.com/UK-Export-Finance/mdm-api/issues/9)) ([367ea57](https://github.com/UK-Export-Finance/mdm-api/commit/367ea57a6490b7ef39f2e252ed26e0d072affe6b))


### Miscellaneous

* added ESLint as part of PR jobs ([#2](https://github.com/UK-Export-Finance/mdm-api/issues/2)) ([9e2c4f7](https://github.com/UK-Export-Finance/mdm-api/commit/9e2c4f7de2a12734033dd2260d1b531e11e470ee))
* automated releases based on conventional commits ([a4a740d](https://github.com/UK-Export-Finance/mdm-api/commit/a4a740d432d9bc32c4c34a3c14fe94b000e70f02))
* **deps:** update all npm packages to their latest version ([#3](https://github.com/UK-Export-Finance/mdm-api/issues/3)) ([1e2ed15](https://github.com/UK-Export-Finance/mdm-api/commit/1e2ed15ecab22070a6c50dc5ca67b67fa623bf6f))
* **deps:** update dependency jest to v29.4.2 ([#6](https://github.com/UK-Export-Finance/mdm-api/issues/6)) ([e688bcd](https://github.com/UK-Export-Finance/mdm-api/commit/e688bcd8820983e10fbda9966dec0caa37ed0759))
* updated the `jest` configs ([#4](https://github.com/UK-Export-Finance/mdm-api/issues/4)) ([33ba85a](https://github.com/UK-Export-Finance/mdm-api/commit/33ba85a9f25ff4bfb549dbece198401cfc8b5db7))
