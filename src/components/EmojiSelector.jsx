import React, { useState, useEffect } from 'react';
import { Table, Input, Tabs } from 'antd';
import { HABIT_EMOJIS } from '../constants/habitEmojis';

const { TabPane } = Tabs;

const EmojiSelector = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredEmojis, setFilteredEmojis] = useState({
    good: HABIT_EMOJIS.good,
    bad: HABIT_EMOJIS.bad,
  });

  const columns = [
    {
      title: 'Emoji',
      dataIndex: 'emoji',
      key: 'emoji',
      width: '80px',
      render: (emoji) => (
        <span style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => onChange(emoji)}>
          {emoji}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  useEffect(() => {
    if (!searchText) {
      setFilteredEmojis({
        good: HABIT_EMOJIS.good,
        bad: HABIT_EMOJIS.bad,
      });
      return;
    }

    const searchLower = searchText.toLowerCase();
    const filterEmojis = (emojis) =>
      emojis.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(searchLower))
      );

    setFilteredEmojis({
      good: filterEmojis(HABIT_EMOJIS.good),
      bad: filterEmojis(HABIT_EMOJIS.bad),
    });
  }, [searchText]);

  return (
    <div className="emoji-selector">
      <Input
        placeholder="Search emojis..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Tabs defaultActiveKey="good">
        <TabPane
          tab={
            <span>
              Good Habits <span style={{ fontSize: '16px' }}>✨</span>
            </span>
          }
          key="good"
        >
          <Table
            dataSource={filteredEmojis.good}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="name"
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              Bad Habits <span style={{ fontSize: '16px' }}>⚠️</span>
            </span>
          }
          key="bad"
        >
          <Table
            dataSource={filteredEmojis.bad}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="name"
          />
        </TabPane>
      </Tabs>

      <style jsx>{`
        .emoji-selector {
          max-height: 400px;
          overflow-y: auto;
        }
        .emoji-selector .ant-table-tbody td {
          padding: 8px 16px !important;
        }
      `}</style>
    </div>
  );
};

export default EmojiSelector;
