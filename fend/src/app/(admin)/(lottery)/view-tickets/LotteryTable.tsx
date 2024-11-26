import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LotteryDrawResponse<T> {
  message: string;
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

interface Result {
  ticket: number[];
  winner: string;
  prize: number;
}

interface DrawData {
  lottery_id: number;
  round: number;
  lottery_type: string;
  is_draw: boolean;
  result: Result[];
}

type LotteryDraws = LotteryDrawResponse<DrawData>;

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  data: any;
}

export const WinnerTable = ({ data, ...props }: Props) => {
  const formatAddress = (address: string) => {
    return `${address?.slice(0, 2)}......${address?.slice(-4)}`;
  };


  console.log(data)

  return (
    <div {...props} className="mt-2">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead>Winner</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Ticket</TableHead>
            <TableHead>Prize</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.lotteries?.length > 0 ? (
            data.lotteries.map((drawData: any, drawArrayIndex: number) =>
              drawData.result.map((draw: any) => (
                <TableRow key={`${drawData.lottery_id}-${draw.prize}`}>
                  <TableCell>{draw.prize}</TableCell>
                  <TableCell>{formatAddress(draw.winner)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      {draw.ticket.map((lottery: number, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black sm:size-10 md:size-7 lg:size-8"
                        >
                          {lottery}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${draw.amount}</TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <div className="flex justify-center my-5 text-xl">No data found</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
};