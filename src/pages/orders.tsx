import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableHOC from '../components/admin/tableHOC';
import { Skeleton } from '../components/loader';
import { useMyOrdersQuery } from '../redux/api/orderAPI';
import { CustomError } from '../types/api-types';
import { UserReducerInitialState } from '../types/reducer-types';

type DataType = {
    _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
}
const column: Column<DataType>[] = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];
const Orders = () => {
  const { user } = useSelector((state:{userReducer:UserReducerInitialState}) => state.userReducer);
  const {data,isLoading,isError,error} = useMyOrdersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([
        {
            _id: "123",
            amount: 56465,
            quantity: 23,
            discount: 5666,
            status:<span className="red">Processing</span>,
            action:<Link to={`/order/123`}>View</Link>

        }
    ]);
    if(isError){
      const err = error as CustomError;
      toast.error(err.data.message)
    }
    const Table = TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",rows.length>6)();
    useEffect(() => {
      if (data)
        setRows(
          data.orders.map((i) => ({
           _id:i._id,
           amount:i.total,
           discount:i.discount,
           quantity:i.orderItems.length,
           status:<span className={i.status === "Processing"?"red":i.status === "Shipped"?"green":"purple"}>{i.status}</span>,
           action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>
          }))
        );
    }, [data]);
  return (
    <div className="container">
        <h1>My Orders</h1>
        {isLoading?<Skeleton length={20}/>:Table}
    </div>
  )
}

export default Orders