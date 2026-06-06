import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { CiCalendar, CiRedo } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";

const NeedAttention = () => {
  return (
    <div className="px-2 md:px-10 lg:px-20 flex flex-col gap-4">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-xl">Needs Attention</CardTitle>
          <Button variant="ghost" size="icon">
            <FiArrowUpRight />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <AiTwotoneExclamationCircle className="text-red-500 shrink-0" />

              <div className="flex items-center gap-2 text-sm">
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
    </div>
  );
};

export default NeedAttention;
