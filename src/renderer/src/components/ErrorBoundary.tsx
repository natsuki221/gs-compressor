import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-900 h-screen overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <div className="bg-white p-4 rounded border border-red-200 shadow-sm">
            <h2 className="font-semibold text-red-600 mb-2">{this.state.error?.toString()}</h2>
            <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto p-2 bg-gray-50 rounded">
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
