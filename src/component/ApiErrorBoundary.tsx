import React, { ErrorInfo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  onRetry: () => void;
}

interface ApiErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ApiErrorBoundary extends React.Component<ApiErrorBoundaryProps, ApiErrorBoundaryState> {
  constructor(props: ApiErrorBoundaryProps) {
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
    console.error('API Error:', error, errorInfo);

    if (error.message === 'Access Denied') {
      toast.error('접근 권한이 없습니다.', {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        toastId: 'access-denied',
      });
    } else {
      toast.error('데이터를 로드하지 못했습니다. 다시 한 번 시도해주세요.', {
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        pauseOnHover: false,
        progress: undefined,
        toastId: 'data-load-failed',
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default ApiErrorBoundary;


