import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: error.stack || 'No error info available',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Check for infinite loop errors specifically
    if (error.message.includes('Maximum update depth exceeded') || 
        error.message.includes('infinite') ||
        error.stack?.includes('routing') ||
        error.stack?.includes('navigation')) {
      
      console.error('🚨 INFINITE LOOP DETECTED:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
      
      // Show alert for critical routing errors
      setTimeout(() => {
        Alert.alert(
          'Navigation Error Detected',
          'An infinite loop was detected in the navigation system. The app has been reset to prevent crashes.',
          [{ text: 'OK' }]
        );
      }, 100);
    }

    this.setState({
      hasError: true,
      error,
      errorInfo: errorInfo.componentStack || null,
    });
  }

  handleRestart = () => {
    // Reset the error boundary state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleShowDetails = () => {
    const { error, errorInfo } = this.state;
    const details = `Error: ${error?.message}\n\nStack: ${error?.stack}\n\nComponent Stack: ${errorInfo}`;
    
    Alert.alert('Error Details', details, [
      { text: 'Copy', onPress: () => console.log('Error details:', details) },
      { text: 'Close' },
    ]);
  };

  render() {
    if (this.state.hasError) {
      const isInfiniteLoopError = this.state.error?.message.includes('Maximum update depth exceeded') ||
                                 this.state.error?.message.includes('infinite');

      return (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={64} color="#ff6b6b" style={styles.icon} />
            
            <Text style={styles.title}>
              {isInfiniteLoopError ? 'Navigation Loop Detected' : 'Something went wrong'}
            </Text>
            
            <Text style={styles.message}>
              {isInfiniteLoopError 
                ? 'The app detected an infinite navigation loop and stopped it to prevent crashes.'
                : 'The app encountered an unexpected error. Don\'t worry, your data is safe.'
              }
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton} onPress={this.handleRestart}>
                <Ionicons name="refresh" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Restart App</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={this.handleShowDetails}>
                <Ionicons name="information-circle" size={20} color="#666" style={styles.buttonIcon} />
                <Text style={styles.secondaryButtonText}>Show Details</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.errorMessage}>
              Error: {this.state.error?.message}
            </Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorContainer: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#25D366',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f1f3f4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  errorMessage: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    fontFamily: 'monospace',
  },
});

export default ErrorBoundary;