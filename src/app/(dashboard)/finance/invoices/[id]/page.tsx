"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Send,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils";
import { invoices, type Invoice } from "@/data/finance";

const statusStyles: Record<
  Invoice["status"],
  { bg: string; text: string; icon: React.ReactNode; label: string }
> = {
  draft: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-700 dark:text-gray-300",
    icon: <FileText className="h-5 w-5" />,
    label: "Draft",
  },
  sent: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    icon: <Send className="h-5 w-5" />,
    label: "Sent",
  },
  paid: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: <CheckCircle className="h-5 w-5" />,
    label: "Paid",
  },
  overdue: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    icon: <AlertCircle className="h-5 w-5" />,
    label: "Overdue",
  },
  cancelled: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-400",
    icon: <XCircle className="h-5 w-5" />,
    label: "Cancelled",
  },
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;

  const invoice = useMemo(
    () => invoices.find((inv) => inv.id === invoiceId),
    [invoiceId]
  );

  if (!invoice) {
    return (
      <EmptyState
        title="Invoice Not Found"
        description="The invoice you are looking for does not exist."
        action={
          <Button onClick={() => router.push("/finance/invoices")}>
            Back to Invoices
          </Button>
        }
      />
    );
  }

  const style = statusStyles[invoice.status];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/finance/invoices")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {invoice.invoiceNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              Invoice for {invoice.clientName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </motion.div>

      {/* Invoice Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-0">
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  PEPS Academy
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Premier Elite Performance Sports
                </p>
                <p className="text-sm text-muted-foreground">
                  Sports Complex Road, Pune, Maharashtra 411001
                </p>
                <p className="text-sm text-muted-foreground">
                  GSTIN: 27AABCT1234F1ZH
                </p>
              </div>
              <div className="text-left md:text-right">
                <h3 className="text-3xl font-bold tracking-tight text-muted-foreground/30">
                  INVOICE
                </h3>
                <p className="text-sm font-mono font-medium mt-2">
                  {invoice.invoiceNumber}
                </p>
                <div
                  className={`inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full ${style.bg} ${style.text}`}
                >
                  {style.icon}
                  <span className="text-sm font-semibold">{style.label}</span>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Client & Dates */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Bill To
                </p>
                <p className="font-semibold text-lg">{invoice.clientName}</p>
                <p className="text-sm text-muted-foreground">
                  Department: {invoice.department}
                </p>
              </div>
              <div className="md:text-right space-y-1">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Issue Date
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(invoice.issuedDate)}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Due Date
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      invoice.status === "overdue"
                        ? "text-red-600 dark:text-red-400"
                        : ""
                    }`}
                  >
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
                {invoice.paidDate && (
                  <div className="mt-2">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Paid Date
                    </p>
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {formatDate(invoice.paidDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="rounded-lg border overflow-hidden mb-8">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Description</TableHead>
                    <TableHead className="font-semibold text-right">
                      Qty
                    </TableHead>
                    <TableHead className="font-semibold text-right">
                      Unit Price
                    </TableHead>
                    <TableHead className="font-semibold text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.description}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.unitPrice)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(invoice.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span className="font-medium">
                    {formatCurrency(invoice.tax)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Grand Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(invoice.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <Separator className="my-8" />
            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>
                Payment terms: Net 30 days. Please include invoice number in
                payment reference.
              </p>
              <p>
                Bank: State Bank of India | Account: 3201XXXXXXX89 | IFSC:
                SBIN0001234
              </p>
              <p>Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
