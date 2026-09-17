"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Loader2,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  X,
  XCircle,
} from "lucide-react";

type OrderItem = {
  id: number;
  orderId: number;
  bookId: number | null;
  title: string;
  image: string | null;
  price: number;
  quantity: number;
  createdAt: string;
};

type Order = {
  id: number;
  orderNumber: string;

  customerName: string;
  email: string;
  phone: string | null;

  address: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;

  subtotal: number;
  shipping: number;
  total: number;

  status:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | string;

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | string;

  paymentMethod: string | null;

  items: OrderItem[];

  createdAt: string;
  updatedAt: string;
};

type OrdersResponse = {
  success: boolean;
  orders: Order[];
  error?: string;
};

const orderStatuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const paymentStatuses = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

function formatMoney(value: number) {
  return `£${Number(value || 0).toFixed(2)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getOrderStatusClasses(status: string) {
  switch (status) {
    case "PROCESSING":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";

    case "SHIPPED":
      return "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400";

    case "DELIVERED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "CANCELLED":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }
}

function getPaymentStatusClasses(status: string) {
  switch (status) {
    case "PAID":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "FAILED":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    case "REFUNDED":
      return "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400";

    default:
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOrders = useCallback(
    async (manualRefresh = false) => {
      try {
        if (manualRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch("/api/admin/orders", {
          method: "GET",
          cache: "no-store",
        });

        const data: OrdersResponse =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load orders."
          );
        }

        setOrders(data.orders ?? []);

        setSelectedOrder((current) => {
          if (!current) return null;

          return (
            data.orders?.find(
              (order) => order.id === current.id
            ) ?? null
          );
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load orders."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      const matchesSearch =
        !query ||
        order.orderNumber
          .toLowerCase()
          .includes(query) ||
        order.customerName
          .toLowerCase()
          .includes(query) ||
        order.email
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter(
        (order) => order.status === "PENDING"
      ).length,

      processing: orders.filter(
        (order) => order.status === "PROCESSING"
      ).length,

      delivered: orders.filter(
        (order) => order.status === "DELIVERED"
      ).length,
    };
  }, [orders]);

  async function updateOrder(
    orderId: number,
    updates: {
      status?: string;
      paymentStatus?: string;
    }
  ) {
    try {
      setUpdatingId(orderId);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update order."
        );
      }

      const updatedOrder: Order = data.order;

      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? updatedOrder
            : order
        )
      );

      setSelectedOrder((current) =>
        current?.id === orderId
          ? updatedOrder
          : current
      );

      setSuccess("Order updated successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update order."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteOrder(order: Order) {
    const confirmed = window.confirm(
      `Delete order ${order.orderNumber}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(order.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/orders/${order.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete order."
        );
      }

      setOrders((current) =>
        current.filter(
          (item) => item.id !== order.id
        )
      );

      if (selectedOrder?.id === order.id) {
        setSelectedOrder(null);
      }

      setSuccess("Order deleted successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete order."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      {/* HEADER */}

      <section
        className="
          mb-7
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h1
            className="
              font-serif
              text-[30px]
              font-semibold
              tracking-[-0.035em]
              text-[#0F172A]
              sm:text-[36px]
              lg:text-[40px]
              dark:text-white
            "
          >
            Orders
          </h1>

          <p
            className="
              mt-2
              text-[13px]
              text-slate-500
              sm:text-[14px]
              dark:text-slate-400
            "
          >
            Manage customer orders and order status.
          </p>
        </div>

        <button
          type="button"
          disabled={refreshing}
          onClick={() => fetchOrders(true)}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            self-start
            rounded-[13px]
            border
            border-slate-200
            bg-white
            px-4
            text-[12px]
            font-semibold
            text-slate-600
            shadow-sm
            transition-all
            hover:border-[#2196F3]/30
            hover:text-[#2196F3]
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-white/10
            dark:bg-[#0B2031]
            dark:text-slate-300
            dark:hover:text-[#64B5F6]
          "
        >
          <RefreshCw
            size={15}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </section>

      {/* ALERTS */}

      {error && (
        <div
          className="
            mb-5
            rounded-[14px]
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-[12px]
            font-medium
            text-red-600
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            mb-5
            flex
            items-center
            gap-2
            rounded-[14px]
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-3
            text-[12px]
            font-medium
            text-emerald-600
            dark:text-emerald-400
          "
        >
          <CheckCircle2 size={15} />

          {success}
        </div>
      )}

      {/* STATS */}

      <section
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={ShoppingBag}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock3}
        />

        <StatCard
          title="Processing"
          value={stats.processing}
          icon={Package}
        />

        <StatCard
          title="Delivered"
          value={stats.delivered}
          icon={CheckCircle2}
        />
      </section>

      {/* TABLE CARD */}

      <section
        className="
          mt-6
          overflow-hidden
          rounded-[22px]
          border
          border-slate-200/80
          bg-white
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          dark:border-white/[0.08]
          dark:bg-[#0B2031]
          dark:shadow-none
        "
      >
        {/* FILTERS */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200/70
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.08]
          "
        >
          <div className="relative w-full sm:max-w-[360px]">
            <Search
              size={16}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search orders..."
              className="
                h-11
                w-full
                rounded-[13px]
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-[12px]
                text-slate-700
                outline-none
                transition
                focus:border-[#2196F3]/40
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="
                h-11
                min-w-[170px]
                appearance-none
                rounded-[13px]
                border
                border-slate-200
                bg-white
                pl-4
                pr-10
                text-[12px]
                font-medium
                text-slate-600
                outline-none
                dark:border-white/10
                dark:bg-[#0B2031]
                dark:text-slate-300
              "
            >
              <option value="ALL">
                All Status
              </option>

              {orderStatuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div
            className="
              flex
              min-h-[380px]
              items-center
              justify-center
            "
          >
            <Loader2
              size={28}
              className="
                animate-spin
                text-[#2196F3]
              "
            />
          </div>
        ) : filteredOrders.length === 0 ? (
          /* EMPTY */

          <div
            className="
              flex
              min-h-[380px]
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-[68px]
                w-[68px]
                items-center
                justify-center
                rounded-[20px]
                border
                border-[#2196F3]/10
                bg-[#2196F3]/[0.07]
                text-[#2196F3]
                dark:border-[#2196F3]/15
                dark:bg-[#2196F3]/10
                dark:text-[#64B5F6]
              "
            >
              <ShoppingBag size={28} />
            </div>

            <h3
              className="
                mt-5
                text-[15px]
                font-semibold
                text-[#0F172A]
                dark:text-white
              "
            >
              No orders found
            </h3>

            <p
              className="
                mt-2
                text-[12px]
                text-slate-400
              "
            >
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          /* TABLE */

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr
                  className="
                    border-b
                    border-slate-200/70
                    bg-slate-50/70
                    dark:border-white/[0.08]
                    dark:bg-white/[0.025]
                  "
                >
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>

                  <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="
                      border-b
                      border-slate-100
                      transition-colors
                      last:border-b-0
                      hover:bg-slate-50/60
                      dark:border-white/[0.06]
                      dark:hover:bg-white/[0.025]
                    "
                  >
                    {/* ORDER */}

                    <td className="px-5 py-4">
                      <p
                        className="
                          text-[13px]
                          font-semibold
                          text-[#0F172A]
                          dark:text-white
                        "
                      >
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        #{order.id}
                      </p>
                    </td>

                    {/* CUSTOMER */}

                    <td className="px-5 py-4">
                      <p
                        className="
                          text-[12px]
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        {order.customerName}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {order.email}
                      </p>
                    </td>

                    {/* ITEMS */}

                    <td className="px-5 py-4">
                      <p
                        className="
                          text-[12px]
                          font-medium
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {order.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </p>
                    </td>

                    {/* TOTAL */}

                    <td className="px-5 py-4">
                      <p
                        className="
                          text-[13px]
                          font-bold
                          text-[#0F172A]
                          dark:text-white
                        "
                      >
                        {formatMoney(order.total)}
                      </p>
                    </td>

                    {/* ORDER STATUS */}

                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        disabled={
                          updatingId === order.id
                        }
                        onChange={(event) =>
                          updateOrder(order.id, {
                            status:
                              event.target.value,
                          })
                        }
                        className={`
                          rounded-full
                          border
                          px-3
                          py-2
                          text-[10px]
                          font-bold
                          outline-none
                          disabled:opacity-60
                          ${getOrderStatusClasses(
                            order.status
                          )}
                        `}
                      >
                        {orderStatuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                              className="
                                bg-white
                                text-slate-700
                                dark:bg-[#0B2031]
                                dark:text-white
                              "
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    {/* PAYMENT */}

                    <td className="px-5 py-4">
                      <select
                        value={order.paymentStatus}
                        disabled={
                          updatingId === order.id
                        }
                        onChange={(event) =>
                          updateOrder(order.id, {
                            paymentStatus:
                              event.target.value,
                          })
                        }
                        className={`
                          rounded-full
                          border
                          px-3
                          py-2
                          text-[10px]
                          font-bold
                          outline-none
                          disabled:opacity-60
                          ${getPaymentStatusClasses(
                            order.paymentStatus
                          )}
                        `}
                      >
                        {paymentStatuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                              className="
                                bg-white
                                text-slate-700
                                dark:bg-[#0B2031]
                                dark:text-white
                              "
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-[11px] text-slate-500 dark:text-slate-400">
                        {formatDate(
                          order.createdAt
                        )}
                      </p>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                          title="View order"
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            text-slate-500
                            transition
                            hover:border-[#2196F3]/30
                            hover:bg-[#2196F3]/5
                            hover:text-[#2196F3]
                            dark:border-white/10
                            dark:text-slate-400
                          "
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          disabled={
                            deletingId === order.id
                          }
                          onClick={() =>
                            deleteOrder(order)
                          }
                          title="Delete order"
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-red-500/15
                            text-red-500
                            transition
                            hover:bg-red-500/10
                            disabled:opacity-50
                          "
                        >
                          {deletingId ===
                          order.id ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/55
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedOrder(null);
            }
          }}
        >
          <div
            className="
              max-h-[90vh]
              w-full
              max-w-[760px]
              overflow-y-auto
              rounded-[24px]
              border
              border-slate-200
              bg-white
              shadow-2xl
              dark:border-white/10
              dark:bg-[#0B2031]
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-start
                justify-between
                gap-4
                border-b
                border-slate-200
                bg-white
                px-6
                py-5
                dark:border-white/10
                dark:bg-[#0B2031]
              "
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2196F3]">
                  Order Details
                </p>

                <h2
                  className="
                    mt-1
                    text-[20px]
                    font-bold
                    text-[#0F172A]
                    dark:text-white
                  "
                >
                  {selectedOrder.orderNumber}
                </h2>

                <p className="mt-1 text-[11px] text-slate-400">
                  {formatDate(
                    selectedOrder.createdAt
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  dark:border-white/10
                  dark:hover:bg-white/5
                "
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* CUSTOMER + SHIPPING */}

              <div className="grid gap-4 md:grid-cols-2">
                <DetailCard title="Customer">
                  <DetailRow
                    label="Name"
                    value={
                      selectedOrder.customerName
                    }
                  />

                  <DetailRow
                    label="Email"
                    value={selectedOrder.email}
                  />

                  <DetailRow
                    label="Phone"
                    value={
                      selectedOrder.phone || "—"
                    }
                  />
                </DetailCard>

                <DetailCard title="Shipping Address">
                  <p
                    className="
                      text-[12px]
                      leading-6
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {selectedOrder.address}
                    <br />

                    {selectedOrder.city}

                    {selectedOrder.state
                      ? `, ${selectedOrder.state}`
                      : ""}

                    <br />

                    {selectedOrder.postalCode}
                    <br />

                    {selectedOrder.country}
                  </p>
                </DetailCard>
              </div>

              {/* ITEMS */}

              <DetailCard title="Items">
                <div className="space-y-3">
                  {selectedOrder.items.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          rounded-[14px]
                          border
                          border-slate-200/80
                          p-4
                          dark:border-white/[0.08]
                          dark:bg-white/[0.02]
                        "
                      >
                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-[12px]
                              font-semibold
                              text-slate-700
                              dark:text-slate-200
                            "
                          >
                            {item.title}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {formatMoney(
                              item.price
                            )}{" "}
                            × {item.quantity}
                          </p>
                        </div>

                        <p
                          className="
                            shrink-0
                            text-[13px]
                            font-bold
                            text-[#0F172A]
                            dark:text-white
                          "
                        >
                          {formatMoney(
                            item.price *
                              item.quantity
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </DetailCard>

              {/* TOTALS */}

              <DetailCard title="Order Summary">
                <div className="space-y-3">
                  <DetailRow
                    label="Subtotal"
                    value={formatMoney(
                      selectedOrder.subtotal
                    )}
                  />

                  <DetailRow
                    label="Shipping"
                    value={formatMoney(
                      selectedOrder.shipping
                    )}
                  />

                  <div
                    className="
                      border-t
                      border-slate-200
                      pt-3
                      dark:border-white/10
                    "
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="
                          text-[13px]
                          font-semibold
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        Total
                      </p>

                      <p
                        className="
                          text-[18px]
                          font-bold
                          text-[#0F172A]
                          dark:text-white
                        "
                      >
                        {formatMoney(
                          selectedOrder.total
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </DetailCard>

              {/* STATUS */}

              <div className="grid gap-4 md:grid-cols-2">
                <DetailCard title="Order Status">
                  <div className="relative">
                    <select
                      value={selectedOrder.status}
                      disabled={
                        updatingId ===
                        selectedOrder.id
                      }
                      onChange={(event) =>
                        updateOrder(
                          selectedOrder.id,
                          {
                            status:
                              event.target.value,
                          }
                        )
                      }
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-[13px]
                        border
                        border-slate-200
                        bg-white
                        px-4
                        pr-10
                        text-[12px]
                        font-semibold
                        text-slate-700
                        outline-none
                        dark:border-white/10
                        dark:bg-white/[0.04]
                        dark:text-white
                      "
                    >
                      {orderStatuses.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />
                  </div>
                </DetailCard>

                <DetailCard title="Payment Status">
                  <div className="relative">
                    <select
                      value={
                        selectedOrder.paymentStatus
                      }
                      disabled={
                        updatingId ===
                        selectedOrder.id
                      }
                      onChange={(event) =>
                        updateOrder(
                          selectedOrder.id,
                          {
                            paymentStatus:
                              event.target.value,
                          }
                        )
                      }
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-[13px]
                        border
                        border-slate-200
                        bg-white
                        px-4
                        pr-10
                        text-[12px]
                        font-semibold
                        text-slate-700
                        outline-none
                        dark:border-white/10
                        dark:bg-white/[0.04]
                        dark:text-white
                      "
                    >
                      {paymentStatuses.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />
                  </div>
                </DetailCard>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: typeof ShoppingBag;
}) {
  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        dark:border-white/[0.08]
        dark:bg-[#0B2031]
        dark:shadow-none
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-[52px]
            w-[52px]
            items-center
            justify-center
            rounded-[16px]
            border
            border-[#2196F3]/10
            bg-[#2196F3]/10
            text-[#2196F3]
            dark:border-[#2196F3]/15
            dark:bg-[#2196F3]/15
            dark:text-[#64B5F6]
          "
        >
          <Icon size={21} />
        </div>

        <div>
          <p
            className="
              text-[11px]
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-[28px]
              font-bold
              tracking-[-0.04em]
              text-[#0F172A]
              dark:text-white
            "
          >
            {value}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =====================================================
   TABLE HEAD
===================================================== */

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-5
        py-4
        text-left
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.08em]
        text-slate-400
      "
    >
      {children}
    </th>
  );
}

/* =====================================================
   DETAIL CARD
===================================================== */

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-[18px]
        border
        border-slate-200/80
        bg-slate-50/50
        p-5
        dark:border-white/[0.08]
        dark:bg-white/[0.025]
      "
    >
      <h3
        className="
          mb-4
          text-[13px]
          font-semibold
          text-[#0F172A]
          dark:text-white
        "
      >
        {title}
      </h3>

      {children}
    </section>
  );
}

/* =====================================================
   DETAIL ROW
===================================================== */

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
        py-1.5
      "
    >
      <span
        className="
          text-[11px]
          text-slate-400
        "
      >
        {label}
      </span>

      <span
        className="
          text-right
          text-[12px]
          font-medium
          text-slate-700
          dark:text-slate-300
        "
      >
        {value}
      </span>
    </div>
  );
}