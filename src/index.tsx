/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-11 00:44
 * @fileName: index.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Action, ActionPanel, Clipboard, closeMainWindow, getSelectedText, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { languageItems } from "./languages";

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
        setMarkdown(selectedText.trim());
      })
      .catch(() => {
        // do nothing
      });
  }

  /**
   *  Replace the language in the code block to the specified language.
   */
  function setCodeBlockLanguage(code: string, newLanguage: string) {
    // console.log(`code:\n ${code}`);
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
    // console.log(`---> newCode:\n ${newCode}`);
    return newCode;
  }

  const onInputChangeEvent = (inputText: string) => {
    setInputText(inputText);
  };

  const actionTitle = inputText.length > 0 ? `Set Language: ${inputText}` : `Set Language`;

  return (
    <List
      isShowingDetail={false}
      searchBarPlaceholder={"Type a language..."}
      searchText={inputText}
      onSearchTextChange={onInputChangeEvent}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Language"
          storeValue={true}
          onChange={(selectedLanauge) => {
            // console.log(`newValue: ${selectedLanauge}`);
            setInputText(selectedLanauge);
          }}
        >
          <List.Dropdown.Section title="Set Language">
            {languageItems.map((languageItem) => (
              <List.Dropdown.Item key={languageItem.name} title={languageItem.name} value={languageItem.value} />
            ))}
          </List.Dropdown.Section>
        </List.Dropdown>
      }
      actions={
        <ActionPanel>
          <Action
            title={actionTitle}
            onAction={() => {
              const newCode = setCodeBlockLanguage(markdown, inputText);
              Clipboard.paste(newCode);
              closeMainWindow({ clearRootSearch: true });
            }}
          />
        </ActionPanel>
      }
    >
      <List.EmptyView
        icon={markdown.length > 0 ? Icon.Checkmark : Icon.ExclamationMark}
        title="Please select the markdown code blocks first"
      />
    </List>
  );
}

/**
 * test code block
 * 
```js
let a = 0;
let b = 1;
let c = a + b;
```
 */
