import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

function Home() {
  const loggedin = { firstName: "Gideon", lastName: "Ovuzorie", email: "contact@ytech.com" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedin?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.99} />
        </header>
      </div>
      <RightSidebar user={loggedin} transactions={[]} banks={[{ currentBalance: 123.45 }, { currentBalance: 987.0 }]} />
    </section>
  );
}

export default Home;
