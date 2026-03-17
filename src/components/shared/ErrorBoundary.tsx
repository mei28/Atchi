import { Component, type ReactNode, type ErrorInfo } from "react";
import { useT } from "../../i18n/I18nProvider";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

function ErrorFallback({
  error,
  onReset,
}: {
  error: Error;
  onReset: () => void;
}) {
  const t = useT();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-base px-8 text-center">
      <p className="font-heading text-xl font-semibold text-ink">
        {t("error.title")}
      </p>
      <p className="text-sm text-muted">{error.message}</p>
      <button
        onClick={onReset}
        className="rounded-xl bg-coral px-6 py-2 font-heading font-semibold text-white"
      >
        {t("error.retry")}
      </button>
    </div>
  );
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}
