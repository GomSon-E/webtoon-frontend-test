import React, { ErrorInfo } from 'react';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
  onRetry: () => void;
  onUpdate: () => void;
  maintenanceTime?: string;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends React.Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅 또는 오류 보고 등의 추가 작업을 수행.
    console.error('Global Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry();
  };

  handleUpdate = () => {
    this.setState({ hasError: false, error: null });
    this.props.onUpdate();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>애플리케이션에서 오류가 발생했습니다.</p>
          <button onClick={this.handleRetry}>다시 시도</button>
        </div>
      );
    }

    if (this.props.maintenanceTime) {
      return (
        <div>
          <p>서비스 점검 중입니다.</p>
          <p style={{ fontSize: '14px', color: 'gray' }}>점검 시간대: {this.props.maintenanceTime}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
