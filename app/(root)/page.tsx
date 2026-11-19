import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Suspense } from "react";

async function HomeContent() {
  const loggedin = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedin?.name}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.99} />
        </header>
      </div>
      <RightSidebar user={loggedin} transactions={[]} banks={[{ currentBalance: 123.45 }, { currentBalance: 987.0 }]} />
    </section>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <HomeContent />
    </Suspense>
  );
}

// export default Home;
