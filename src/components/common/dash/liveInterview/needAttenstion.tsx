import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { CiCalendar, CiRedo } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";

const NeedAttention = () => {
  return (
    <Card className="rounded-[24px] shadow-sm">
      <CardHeader className="flex justify-between items-center px-6 py-6">
        <CardTitle className="text-xl">Needs Attention</CardTitle>
        <Button variant="ghost" size="icon">
          <FiArrowUpRight />
        </Button>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <AiTwotoneExclamationCircle className="text-red-500 shrink-0" />

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-text-color-primary">
                AI failed to join
              </span>
              <span className="text-text-subtext">-</span>
              <span className="text-text-subtext">Temi Balogun</span>
              <span className="text-text-subtext">•</span>
              <span className="text-text-subtext">Frontend Engineer</span>
            </div>
          </div>

          <div className="flex gap-2 text-gray-500">
            <Button variant="ghost" size="icon">
              <CiRedo />
            </Button>

            <Button variant="ghost" size="icon">
              <CiCalendar />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeedAttention;
