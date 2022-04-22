import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import * as React from 'react';

export default function Users({ count, setCount }) {
  const address = `https://randomuser.me/api/?results=${count}&seed=abcd`;
  const fetcher = async (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(address, fetcher);
  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  return (
    <div>
      <div className="container">
        {data &&
          data.results.map((item) => (
            <div key={item.cell} className={`user-card  ${item.gender}`}>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={item.picture.large}
                  alt="user-avatar"
                  className="img"
                />
                <h3>{`${item.name.first}  ${item.name.last}`}</h3>
              </div>
              <div className="details">
                <p>Country: {item.location.country}</p>
                <p>State: {item.location.state}</p>
                <p>Email: {item.email}</p>
                <p>Phone: {item.phone}</p>
                <p>Age: {item.dob.age}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="center">
        <div className="btn">
          <button onClick={() => setCount(count + 3)}>Load More Users</button>
        </div>
      </div>
    </div>
  );
}
