import { useAppContext } from "../../context";
import Deals from "./Deals";

const DealsContainer = () => {
  const { text, regSection } = useAppContext();

  const deals = [
    {
      title: text("landing.deals.deal-1.title"),
      text: text("landing.deals.deal-1.text"),
      ico: "/images/landing/ico.svg",
    },
    {
      title: text("landing.deals.deal-2.title"),
      text: text("landing.deals.deal-2.text"),
      ico: "/images/landing/ico-02.svg",
    },
    {
      title: text("landing.deals.deal-3.title"),
      text: text("landing.deals.deal-3.text"),
      ico: "/images/landing/ico-03.svg",
    },
    {
      title: text("landing.deals.deal-4.title"),
      text: text("landing.deals.deal-4.text"),
      ico: "/images/landing/ico-04.svg",
    },
  ];
  const props = {
    regSection,
    text,
    deals,
  };
  return <Deals {...props} />;
};

export default DealsContainer;
