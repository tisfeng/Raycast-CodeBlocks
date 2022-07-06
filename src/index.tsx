/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-07 00:28
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
    ```js
    npm i @types/react -s
    npm i @types/react-dom -s
    ```

    ```js
    npm i @types/react -s
    npm i @types/react-dom -s
    ```
   */
  function replaceCodeBlockLanuage(code: string, language: string) {
    const lines = code.split("\n");
    let index = 0;
    const newLines = lines.map((line) => {
      console.log(`line: ${line}`);

      if (line.trim().startsWith("```")) {
        index += 1;
        if (index % 2 === 1) {
          const [, originalLanguage] = line.split("```");
          console.log(`originalLanguage: ${originalLanguage}`);
          if (originalLanguage.length > 0) {
            console.log(`replace language: ${language}`);
            return line.replace(originalLanguage, `${language}`);
          } else {
            console.log(`language is empty`);
            return line + language;
          }
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
      searchBarPlaceholder={"Type a language to replace in the selected code blocks"}
      onSearchTextChange={onInputChangeEvent}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title={`Replace With ${inputText}`}
            content={markdown}
            onCopy={() => {
              Clipboard.paste(markdown);
            }}
          />
        </ActionPanel>
      }
    >
      <List.EmptyView icon={Icon.TextDocument} title="Please select the markdown code blocks first" />
    </List>
  );
}
