/*
 * @author: tisfeng
 * @createTime: 2022-07-07 11:42
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-10 00:40
 * @fileName: programLanguages.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

export interface ProgramLanguage {
  name: string;
  value: string;
}

/**
 * programLanguages, include Objective-C, Swift, JavaScript, TypeScript, Bash, C, Python
 *
 * ref: https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */
export const programLanguages: ProgramLanguage[] = [
  { name: "Objective-C", value: "objc" },
  { name: "Swift", value: "swift" },
  { name: "JavaScript", value: "js" },
  { name: "TypeScript", value: "ts" },
  { name: "TSX", value: "tsx" },
  { name: "Bash", value: "bash" },
  { name: "C", value: "c" },
  { name: "Python", value: "py" },
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
