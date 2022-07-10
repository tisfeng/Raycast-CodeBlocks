/*
 * @author: tisfeng
 * @createTime: 2022-07-07 11:42
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-11 00:41
 * @fileName: languages.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

export interface LanguageItem {
  name: string;
  value: string;
}

/**
 * programLanguages, include Objective-C, Swift, JavaScript, TypeScript, Bash, C, Python
 *
 * ref: https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */
export const languageItems: LanguageItem[] = [
  { name: "Swift", value: "swift" },
  { name: "Objective-C", value: "objc" },
  { name: "JavaScript", value: "js" },
  { name: "TypeScript", value: "ts" },
  { name: "TSX", value: "tsx" },
  { name: "Bash", value: "bash" },
  { name: "C", value: "c" },
  { name: "Python", value: "py" },
  { name: "Java", value: "java" },
  { name: "C++", value: "cpp" },
  { name: "C#", value: "cs" },
  { name: "Go", value: "go" },
  { name: "Rust", value: "rs" },
  { name: "Ruby", value: "rb" },
  { name: "PHP", value: "php" },
  { name: "Perl", value: "pl" },
  { name: "R", value: "r" },
  { name: "SQL", value: "sql" },
];
