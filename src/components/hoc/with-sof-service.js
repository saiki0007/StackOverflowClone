import React from 'react';
import { SofServiceConsumer } from '../sof-service-context';

const withSofService = () => (Wrapper) => {
  return (props) => {
    return <SofServiceConsumer>
      {
        (sofService) => {
          return <Wrapper {...props} sofService={sofService} />
        }
      }
    </SofServiceConsumer>
  }
};

export default withSofService;