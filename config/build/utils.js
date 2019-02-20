const path = require('path');
const fs = require('fs');
const glob = require('fast-glob');

const PROJECT_DIR = path.join(__dirname, '../../');
const DEFAULT_PAGES_FOLDER = path.join(PROJECT_DIR, 'src/pages');
const COMMON_PAGES_TEMPLATE_FILE = path.join(
  PROJECT_DIR,
  'src/pages/index.html'
);

const DEFAULT_VUE_PAGES_FOLDER = path.join(PROJECT_DIR, 'src/vuepages');
const COMMON_VUE_PAGES_TEMPLATE_FILE = path.join(
  PROJECT_DIR,
  'src/vuepages/index.html'
);

const getPageEntryNames = (pagesFolder = DEFAULT_PAGES_FOLDER) => {
  return glob.sync(['**/page.@(js|jsx)', '!**/components/**/*'], {
    cwd: pagesFolder,
  });
};

const getPageEntries = (pagesFolder = DEFAULT_PAGES_FOLDER) => {
  return getPageEntryNames(pagesFolder).reduce((map, entry) => {
    const me = entry.match(/^(.+)\/(page.jsx?)$/);
    const entryName = me[1];
    const fileName = path.join(pagesFolder, entry);
    map[entryName] = fileName;
    return map;
  }, {});
};

const getPageEntryAndTemplate = (
  pagesFolder = DEFAULT_PAGES_FOLDER,
  defaultTempalteFile = COMMON_PAGES_TEMPLATE_FILE
) => {
  return Object.entries(getPageEntries(pagesFolder)).map(
    ([entryName, entryFile]) => {
      const customEntryTemplateFile = path.join(
        pagesFolder,
        entryName,
        'index.html'
      );
      const templateFile = fs.existsSync(customEntryTemplateFile)
        ? customEntryTemplateFile
        : defaultTempalteFile;
      return {
        entryName,
        entryFile,
        templateFile,
      };
    }
  );
};

module.exports = {
  getPageEntryNames,
  getPageEntries,
  getPageEntryAndTemplate,
  DEFAULT_VUE_PAGES_FOLDER,
  COMMON_VUE_PAGES_TEMPLATE_FILE,
};
