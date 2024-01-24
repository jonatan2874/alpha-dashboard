import {
    TwCard
} from "../../../../components";
import { TwTabs } from "../../../../components/ui/Tabs";
import AdvancedUsageCrud from "./AdvancedUsageCrud";
import BasicUsageCrud from "./BasicUsageCrud";
const CrudExample = () => {

    const tabs = ['Uso básico', 'Uso avanzado'];
    const tabsComponents = [
        <BasicUsageCrud />,
        <AdvancedUsageCrud />
    ];


    return (
        <TwCard>
            <TwTabs tabs={tabs} tabsComponents={tabsComponents} />
        </TwCard>
    );
}

export default CrudExample;