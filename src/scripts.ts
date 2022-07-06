/*
 * @author: tisfeng
 * @createTime: 2022-07-07 00:40
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-07 01:39
 * @fileName: scripts.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { exec } from "child_process";

export function exitExtension() {
  console.log("exit extension");
  // use cmd+W to close the extension, maybe delay a little bit, 0.5s
  const appleScript = `
    tell application "System Events"
    key code 13 using {command down}
    end tell
    `;

  exec(`osascript -e '${appleScript}'`, (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
