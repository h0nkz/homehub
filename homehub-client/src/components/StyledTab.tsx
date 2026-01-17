import { styled } from "@mui/material/styles";
import { Tab, Tabs, Typography } from '@mui/material';
import type { Theme } from "@mui/material/styles";

interface StyledTabProps {
    label: string
    value: string
}

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.primary.main,
    border: 2,
    borderColor: theme.palette.primary.main,
    width: (1024-48)/4,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      border: 2,
      borderRadius: 2,
      color: theme.palette.background.default,
    },
  }));

  interface StyledTabsProps {
      children?: React.ReactNode;
      value: string;
      onChange: (event: React.SyntheticEvent, newValue: string) => void;
    }
    const StyledTabs = styled((props: StyledTabsProps) => (
      <Tabs
        {...props}
        centered
        sx={{
          color: 'primary.main'
        }}
      />
    ))({
      '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
      },
    });

export {
    StyledTab, 
    StyledTabs
};