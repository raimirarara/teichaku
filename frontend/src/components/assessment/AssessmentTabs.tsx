import { Container, Tabs, Text } from "@mantine/core";
import { IconChartLine, IconChartPie3 } from "@tabler/icons";

import { DaoHistory } from "@/domains/DaoHistory";
import IndivisualTab from "./IndivisualTab";
import TotalTab from "./TotalTab";
import useMetaMask from "@/hooks/web3/useMetaMask";
import { Assessment } from "@/domains/Assessment";

interface Props {
  daoHistory: DaoHistory[];
}

const AssessmentTabs = (props: Props) => {
  const { daoHistory } = props;
  const { address } = useMetaMask();
  if (!address) {
    return (
      <Container>
        <Text>Your MetaMask address not found</Text>
      </Container>
    );
  }

  const myDaoHistory = () => {
    return daoHistory.filter((dao) => dao.contributor === address);
  };

  return (
    <Tabs defaultValue="total">
      <Tabs.List>
        <Tabs.Tab value="total" icon={<IconChartLine size={14} />}>
          Total
        </Tabs.Tab>
        <Tabs.Tab value="individual" icon={<IconChartPie3 size={14} />}>
          Individual
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="total" pt="xs">
        <TotalTab myDaoHistory={myDaoHistory()} />
      </Tabs.Panel>

      <Tabs.Panel value="individual" pt="xs">
        <IndivisualTab myDaoHistory={myDaoHistory()} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AssessmentTabs;
