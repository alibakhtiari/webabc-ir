
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema: Record<string, any>;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
