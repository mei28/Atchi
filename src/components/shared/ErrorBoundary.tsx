import { Component, type ReactNode, type ErrorInfo } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

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
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-base px-8 text-center">
          <p className="font-heading text-xl font-semibold text-ink">
            エラーが発生しました
          </p>
          <p className="text-sm text-muted">{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-xl bg-coral px-6 py-2 font-heading font-semibold text-white"
          >
            やり直す
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
