import { HomeShell } from "../../../features/home/home-shell";
import { PageHeader } from "../../../features/home/page-header";
import { ShopView } from "../../../features/shop/shop-view";

export default function ShopPage() {
  return (
    <HomeShell>
      <PageHeader title="Shop" />
      <ShopView />
    </HomeShell>
  );
}
