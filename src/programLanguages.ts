/*
 * @author: tisfeng
 * @createTime: 2022-07-07 11:42
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-07 16:02
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
 */
export const programLanguages: ProgramLanguage[] = [
  { name: "Objective-C", value: "objc" },
  { name: "Swift", value: "swift" },
  { name: "JavaScript", value: "js" },
  { name: "TypeScript", value: "ts" },
  { name: "Bash", value: "bash" },
  { name: "C", value: "c" },
  { name: "Python", value: "py" },
];
