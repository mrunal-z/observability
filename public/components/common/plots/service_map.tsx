import {
  EuiButtonGroup,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';
import Graph from 'react-graph-vis';
import _ from 'lodash';
import { PanelTitle } from '..';
import { Plt } from './plt';
import { ServiceMapScale } from './service_map_scale';

export interface ServiceObject {
  [key: string]: {
    serviceName: string;
    id: number;
    traceGroups: { traceGroup: string; targetResource: string[] }[];
    targetServices: string[];
  };
}

export function ServiceMap({
  items,
  serviceMap,
  idSelected,
  setIdSelected,
}: {
  items: any;
  serviceMap: ServiceObject;
  idSelected: string;
  setIdSelected: (newId: string) => void;
}) {
  const [serviceQuery, setServiceQuery] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [network, setNetwork] = useState(null);
  const toggleButtons = [
    {
      id: 'latency',
      label: 'Latency',
    },
    {
      id: 'error_rate',
      label: 'Error rate',
    },
    {
      id: 'throughput',
      label: 'Throughput',
    },
  ];

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      arrows: {
        to: {
          enabled: false,
        },
      },
    },
    nodes: {
      shape: 'dot',
      color: '#adadad',
      font: {
        size: 17,
        color: '#387ab9',
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 30,
      selectable: true,
    },
    manipulation: {
      enabled: false,
    },
    height: '434px',
    width: '100%',
    autoResize: true,
  };

  const events = {
    select: function (event) {
      const { nodes, edges } = event;
      console.log('select', nodes, edges);
    },
    hoverNode: function (event) {
      console.log('hover', event);
    },
  };

  const onFocus = (service: string) => {
    if (service.length === 0) {
      setInvalid(false);
    } else if (serviceMap[service]) {
      network.focus(serviceMap[service].id, { animation: true });
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service map" />
        <EuiSpacer size="m" />
        <EuiButtonGroup
          options={toggleButtons}
          idSelected={idSelected}
          onChange={(id) => setIdSelected(id)}
          buttonSize="s"
          color="text"
        />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiText>Focus on</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder="Service name"
              value={serviceQuery}
              onChange={(e) => setServiceQuery(e.target.value)}
              onSearch={(service) => onFocus(service)}
              isInvalid={invalid}
              isClearable={false}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />

        <EuiFlexGroup gutterSize="none" responsive={false}>
          <EuiFlexItem grow={false}>
            <ServiceMapScale idSelected={idSelected} />
          </EuiFlexItem>
          <EuiFlexItem>
            {items?.graph && (
              <Graph
                graph={items.graph}
                options={options}
                events={events}
                getNetwork={(network) => setNetwork(network)}
              />
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
}
