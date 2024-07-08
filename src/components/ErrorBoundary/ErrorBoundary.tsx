import { Component, ReactNode } from 'react';
import './styles.css';

interface IErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">{this.props.fallback}</div>;
    }

    return this.props.children;
  }
}
