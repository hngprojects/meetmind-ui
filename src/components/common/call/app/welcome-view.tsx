import { Button } from "@/components/ui/button";

function WelcomeImage() {
  const pathD = [
    "M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213",
    "C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213",
    "C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787",
    "C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787",
    "C14.6839 22.4413 15 23.2044 15 24Z",

    "M22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868",
    "C19.3161 6.44129 19 7.20435 19 8V56",
    "C19 56.7957 19.3161 57.5587 19.8787 58.1213",
    "C20.4413 58.6839 21.2044 59 22 59",
    "C22.7956 59 23.5587 58.6839 24.1213 58.1213",
    "C24.6839 57.5587 25 56.7957 25 56V8",
    "C25 7.20435 24.6839 6.44129 24.1213 5.87868",
    "C23.5587 5.31607 22.7956 5 22 5Z",

    "M32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787",
    "C29.3161 14.4413 29 15.2044 29 16V48",
    "C29 48.7957 29.3161 49.5587 29.8787 50.1213",
    "C30.4413 50.6839 31.2044 51 32 51",
    "C32.7956 51 33.5587 50.6839 34.1213 50.1213",
    "C34.6839 49.5587 35 48.7957 35 48V16",
    "C35 15.2044 34.6839 14.4413 34.1213 13.8787",
    "C33.5587 13.3161 32.7956 13 32 13Z",

    "M42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787",
    "C39.3161 22.4413 39 23.2044 39 24V40",
    "C39 40.7957 39.3161 41.5587 39.8787 42.1213",
    "C40.4413 42.6839 41.2043 43 42 43",
    "C42.7957 43 43.5587 42.6839 44.1213 42.1213",
    "C44.6839 41.5587 45 40.7957 45 40V24",
    "C45 23.2044 44.6839 22.4413 44.1213 21.8787",
    "C43.5587 21.3161 42.7957 21 42 21Z",

    "M52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787",
    "C49.3161 18.4413 49 19.2044 49 20V44",
    "C49 44.7957 49.3161 45.5587 49.8787 46.1213",
    "C50.4413 46.6839 51.2043 47 52 47",
    "C52.7957 47 53.5587 46.6839 54.1213 46.1213",
    "C54.6839 45.5587 55 44.7957 55 44V20",
    "C55 19.2044 54.6839 18.4413 54.1213 17.8787",
    "C53.5587 17.3161 52.7957 17 52 17Z",
  ].join(" ");

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-fg0 mb-4 size-16"
    >
      <path d={pathD} fill="currentColor" />
    </svg>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<"div"> & WelcomeViewProps) => {
  return (
    <div ref={ref}>
      <section className="bg-background flex flex-col items-center justify-center text-center">
        <WelcomeImage />

        <p className="text-foreground max-w-prose pt-1 leading-6 font-medium">
          Chat live with your voice AI agent
        </p>

        <Button
          size="lg"
          onClick={onStartCall}
          className="mt-6 w-64 rounded-full font-mono text-xs font-bold tracking-wider uppercase"
        >
          {startButtonText}
        </Button>
      </section>

      <div className="fixed bottom-5 left-0 flex w-full items-center justify-center">
        <p className="text-muted-foreground max-w-prose pt-1 text-xs leading-5 font-normal text-pretty md:text-sm">
          Need help getting set up? Check out the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.livekit.io/agents/start/voice-ai/"
            className="underline"
          >
            Voice AI quickstart
          </a>
          .
        </p>
      </div>
    </div>
  );
};
