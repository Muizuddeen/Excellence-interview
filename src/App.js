import React,{useState, useEffect} from "react";
import "./App.css";
import Pagination from './components/Pagination';
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] =useState(1);
  const [totalPages, setTotalPages]= useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    setLoading(false);
    const json = await res.json();
    setUsers(json.data);
    setTotalPages(Math.ceil(json.total/json.per_page));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);


  const handleClick  = num =>{
   setPage(num)
  }

  return (
    <div className="App">
      <h1>Users</h1>
        {loading? (<p>Loading...</p>):
      (<div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} alt={user.alt}/>

              </div>
            );
          })}
          </div>)
     }
      <Pagination totalPages ={totalPages} handleClick= {handleClick} />

    </div>
  );
}
