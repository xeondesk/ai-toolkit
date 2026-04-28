const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

const symbols = {
  info: 'ℹ',
  success: '✓',
  warn: '⚠',
  error: '✗',
  arrow: '›',
};

export const logger = {
  info(message) {
    console.log(`${colors.blue}${symbols.info}${colors.reset} ${message}`);
  },

  success(message) {
    console.log(`${colors.green}${symbols.success}${colors.reset} ${message}`);
  },

  warn(message) {
    console.warn(`${colors.yellow}${symbols.warn}${colors.reset} ${message}`);
  },

  error(message) {
    console.error(`${colors.red}${symbols.error}${colors.reset} ${message}`);
  },

  header(message) {
    console.log(`\n${colors.blue}${message}${colors.reset}`);
  },

  subheader(message) {
    console.log(`${colors.dim}${message}${colors.reset}`);
  },
};

export const chalk = {
  red(text) {
    return `${colors.red}${text}${colors.reset}`;
  },
  green(text) {
    return `${colors.green}${text}${colors.reset}`;
  },
  yellow(text) {
    return `${colors.yellow}${text}${colors.reset}`;
  },
  blue(text) {
    return `${colors.blue}${text}${colors.reset}`;
  },
  dim(text) {
    return `${colors.dim}${text}${colors.reset}`;
  },
};

export function formatList(items, indent = 2) {
  const spaces = ' '.repeat(indent);
  return items.map((item) => spaces + '• ' + item).join('\n');
}

export function formatGrid(items, cols = 2) {
  const maxLen = Math.max(...items.map((i) => i.length));
  return items.reduce((acc, item, i) => {
    return (
      acc +
      item +
      ' '.repeat(maxLen - item.length + 2) +
      (i % cols === cols - 1 ? '\n' : '')
    );
  }, '');
}