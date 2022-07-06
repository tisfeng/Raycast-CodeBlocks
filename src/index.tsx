/*
 * @author: tisfeng
 * @createTime: 2022-06-30 00:23
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-06 20:39
 * @fileName: index.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Action, ActionPanel, Icon, List } from "@raycast/api";

export default function Command() {
  return (
    <List
      isShowingDetail={true}
      searchBarPlaceholder={"Search word or translate text..."}
      // searchText={inputText}
      // onSearchTextChange={onInputChangeEvent}
      actions={
        <ActionPanel>
          <ActionFeedback />
        </ActionPanel>
      }
    >
      <List.EmptyView icon={Icon.TextDocument} title="Type a word to look up or translate" />
      <List.Item
        icon={Icon.Star}
        title="js"
        accessories={[{ text: "Germany" }]}
        detail={<List.Item.Detail markdown={"hello word"} />}
      />
    </List>
  );
}

export function ActionFeedback() {
  return <Action icon={Icon.QuestionMark} title="Feedback" />;
}
