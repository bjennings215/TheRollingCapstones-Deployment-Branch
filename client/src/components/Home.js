const Home = () => {
    return<div className="dashboard">
       <div className="welcome">
      <div className="content">
        <h1 className="fs-3">Welcome to Dashboard</h1>
        <p className="mb-0">Here is what we got!</p>
      </div>
      </div>
     <iframe className ="count" src="https://charts.mongodb.com/charts-capcodes-database-igkqn/embed/charts?id=6384207c-b644-4e24-8798-fbc12406d00b&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
    <iframe className ="donut" src="https://charts.mongodb.com/charts-capcodes-database-igkqn/embed/charts?id=6384207c-b644-4776-8f8a-fbc12406d01b&maxDataAge=86400&theme=dark&autoRefresh=true"></iframe>
    <iframe className="users_chart" src="https://charts.mongodb.com/charts-capcodes-database-igkqn/embed/charts?id=6384207c-b644-42ef-8155-fbc12406d01d&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
    </div>
  };
  
  export default Home;