/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-07 01:37
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
    if (inputText) {
      replaceCodeBlockLanuage(markdown, inputText);
    } else {
      tryQuerySelecedtText();
    }
  }, [inputText]);

  function tryQuerySelecedtText() {
    getSelectedText()
      .then((selectedText) => {
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
          const [, originalLanguage] = line.split("```");
          if (originalLanguage.length > 0) {
            return line.replace(originalLanguage, `${language}`);
          } else {
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
    setMarkdown(newCode);
    return newCode;
  }

  const onInputChangeEvent = (inputText: string) => {
    setInputText(inputText.trim());
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
              const newCode = replaceCodeBlockLanuage(markdown, inputText);
              Clipboard.paste(newCode);
              closeMainWindow();
            }}
          />
        </ActionPanel>
      }
    >
      <List.EmptyView icon={Icon.TextDocument} title="Please select the markdown code blocks first" />
    </List>
  );
}
