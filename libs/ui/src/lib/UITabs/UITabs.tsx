import { SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export interface UiTab {
  key: string;
  label: string;
  Component: any;
}

export interface UITabsProps {
  className?: string;
  tabs: UiTab[];
  ariaLabel?: string;
  activeTab?: string;
  onTabsChange?: (newValue: string) => void;
  stretchTab?: boolean;
}

export const getTabId = (index: number) => `tab-${index}`;

export const getTabpanelId = (index: number) => `tabpanel-${index}`;

export const a11yProps = (index: number) => ({
  id: getTabId(index),
  'aria-controls': getTabpanelId(index),
});

export const UITabs = ({ className, tabs, ariaLabel, activeTab, onTabsChange, stretchTab = false }: UITabsProps) => {
  let initialActiveTab;

  if (!activeTab) {
    initialActiveTab = tabs[0].key;
  } else {
    const tabsKeys = tabs.map(({ key }) => key);

    if (!tabsKeys.includes(activeTab)) {
      console.warn('activeTab does not exist in the tabs list');

      initialActiveTab = tabs[0].key;
    } else {
      initialActiveTab = activeTab;
    }
  }

  const [tabValue, setTabValue] = useState(initialActiveTab);
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    onTabsChange && onTabsChange(newValue);
  };
  let stretchTabStyles: any = {};

  if (stretchTab) {
    stretchTabStyles = { maxWidth: 'none', flexGrow: 1 };
  }

  return (
    <div className={className}>
      <TabContext value={tabValue}>
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label={ariaLabel}>
            {tabs.map(({ label, key }, index) => (
              <Tab key={key} value={key} sx={stretchTabStyles} label={label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {tabs.map(({ key, Component }) => (
          <TabPanel key={key} value={key}>
            <Component />
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};

export default UITabs;
