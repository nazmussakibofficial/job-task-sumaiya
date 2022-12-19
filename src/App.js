import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [sectorLoading, setSectorLoading] = useState(true);
  const [savedDataLoading, setSavedDataLoading] = useState(true);
  const [sectors, setSectors] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    fetch('https://coding-challenge-server.vercel.app/sectors')
      .then(res => res.json())
      .then(data => {
        setSectors(data)
        setSectorLoading(false)
      })
      .catch(error => { })
  }, [])

  useEffect(() => {
    fetch('https://coding-challenge-server.vercel.app/saved')
      .then(res => res.json())
      .then(data => {
        setSavedData(data)
        setSavedDataLoading(false)
      })
      .catch(error => { })
  }, [savedData])

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const sector = form.sector.value;

    const savedObj = {
      name,
      sector,
      isAgreed
    }

    console.log(savedObj)

    fetch('https://coding-challenge-server.vercel.app/saved', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(savedObj)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsAgreed(false)
        form.reset();
      })
      .catch(error => { })
  }

  if (sectorLoading && savedDataLoading) {
    return <button className="btn loading">loading</button>;
  }

  return (
    <div data-theme="night" className='min-w-full'>
      <h1 className='text-3xl bg-neutral text-white text-center py-5'>Please enter your name and pick the Sectors you are currently involved in.</h1>
      <div className="hero min-h-screen bg-neutral">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className='ml-5'>
            <div className="overflow-x-auto mt-10">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    savedData.map((item, i) => <tr key={item._id}>
                      <th>{i + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.sector}</td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" name="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Your Sector</span>
                </label>
                <select alt='Select Sector From Below' name="sector" className="select select-primary w-full max-w-xs" required>
                  {
                    sectors.map(sector => <option alt={sector.name} key={sector._id} value={sector.name}>{sector.name}</option>)
                  }
                </select>
              </div>
              <div className="form-control flex justify-center items-center mt-2">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Agree to terms</span>
                  <input type="checkbox" name="terms" className="checkbox checkbox-lg" onChange={() => setIsAgreed(!isAgreed)} required />
                </label>
              </div>

              <div className="form-control mt-4">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
