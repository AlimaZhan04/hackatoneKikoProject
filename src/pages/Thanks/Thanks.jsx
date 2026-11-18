import React from 'react';
import { Link } from 'react-router-dom';
import done from './images/done.png';
import { readStored } from '../../helpers/shop.mjs';
export default function Thanks(){const order=readStored('kiko-last-order',null);return <div className="thanks-page">{order?<><img src={done} alt="Demo purchase completed"/><h2>Thank you for your purchase!</h2><p>Demo order #{order.id} · {order.total} $</p><p>No money was charged. Your bag has been cleared.</p><h4>We are waiting for you again in our store!</h4></>:<h2>No completed demo purchase yet.</h2>}<Link to="/best">Continue shopping</Link></div>;}
