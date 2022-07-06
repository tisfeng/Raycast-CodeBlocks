/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-06 22:41
 * @fileName: index.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Action, ActionPanel, Clipboard, getSelectedText, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function () {
  const [inputText, setInputText] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    if (inputText) {
      replaceCodeBlockLanuage(markdown, inputText);
    } else {
      tryQuerySelecedtText();
    }
  }, [inputText]);

  function tryQuerySelecedtText() {
    console.log("try query selected text");
    getSelectedText()
      .then((selectedText) => {
        console.log(`getSelectedText: ${selectedText}`);
        setMarkdown(selectedText);
      })
      .catch(() => {
        // do nothing
      });
  }

  /**
   * function: replaceCodeBlock, Replace the language in the code block to the specified language
   * 
```ts
npm i @types/react -s

npm i @types/react-dom -s
```
   */
  function replaceCodeBlockLanuage(code: string, language: string) {
    const lines = code.split("\n");
    let index = 0;
    const newLines = lines.map((line) => {
      if (line.trim().startsWith("```")) {
        index += 1;
        if (index % 2 === 1) {
          return line.replace(line, `\`\`\`${language}`);
        } else {
          return line;
        }
      } else {
        return line;
      }
    });

    const newCode = newLines.join("\n");
    console.log(`newCode:\n ${newCode}`);

    setMarkdown(newCode);
    return newCode;
  }

  const onInputChangeEvent = (inputText: string) => {
    console.log(`input: ${inputText}`);
    setInputText(inputText.trim());
  };

  return (
    <List
      isShowingDetail={false}
      searchBarPlaceholder={"Code block language"}
      onSearchTextChange={onInputChangeEvent}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title={`Replace Language With ${inputText}`}
            content={markdown}
            onCopy={() => {
              Clipboard.paste(markdown);
            }}
            // onAction={pop}
            // onAction={() => {
            //   replaceCodeBlockLanuage(markdown, inputText);
            //   return pop;
            // }}
          />
        </ActionPanel>
      }
    >
      <List.EmptyView icon={Icon.TextDocument} title="Type a language to replace code block markdown" />
    </List>
  );
}
