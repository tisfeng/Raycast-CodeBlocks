/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-07 11:03
 * @fileName: index.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Action, ActionPanel, Clipboard, closeMainWindow, getSelectedText, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function () {
  const [inputText, setInputText] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    if (!inputText) {
      tryQuerySelecedtText();
    }
  }, [inputText]);

  function tryQuerySelecedtText() {
    getSelectedText()
      .then((selectedText) => {
        console.log("selectedText:\n", selectedText);
        setMarkdown(selectedText);
      })
      .catch(() => {
        // do nothing
      });
  }

  /**
   * function: replaceCodeBlock, Replace the language in the code block to the specified language
   * 
    ```js
    npm i @types/react -s
    npm i @types/react-dom -s
    ```

    ```
    npm i @types/react -s
    npm i @types/react-dom -s
    ```
   */
  function replaceCodeBlockLanguage(code: string, newLanguage: string) {
    console.log(`code:\n ${code}`);
    const lines = code.split("\n");
    const codeBlockSymbol = "```";
    let index = 0;
    const newLines = lines.map((line) => {
      // console.log(`line: ${line}`);
      if (line.trim().startsWith(codeBlockSymbol)) {
        index += 1;
        if (index % 2 === 1) {
          const [startSymbol, originalLanguage] = line.split(codeBlockSymbol);
          if (originalLanguage.length > 0) {
            // console.log(`originalLanguage > 0: ${originalLanguage}`);
            const replacedLanguage = originalLanguage.replace(originalLanguage, `${newLanguage}`);
            return `${startSymbol}${codeBlockSymbol}${replacedLanguage}`;
          } else {
            // console.log(`originalLanguage is empty`);
            return line + newLanguage;
          }
        } else {
          return line;
        }
      } else {
        return line;
      }
    });
    const newCode = newLines.join("\n");
    console.log(`---> newCode:\n ${newCode}`);
    return newCode;
  }

  const onInputChangeEvent = (inputText: string) => {
    setInputText(inputText);
  };

  return (
    <List
      isShowingDetail={false}
      searchBarPlaceholder={"Type a language to replace in the selected code blocks"}
      onSearchTextChange={onInputChangeEvent}
      actions={
        <ActionPanel>
          <Action
            title={`Replace With ${inputText}`}
            onAction={() => {
              const newCode = replaceCodeBlockLanguage(markdown, inputText);
              Clipboard.paste(newCode);
              closeMainWindow({ clearRootSearch: true });
            }}
          />
        </ActionPanel>
      }
    >
      <List.EmptyView icon={Icon.TextDocument} title="Please select the markdown code blocks first" />
    </List>
  );
}
