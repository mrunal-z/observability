/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { NetworkDiagram } from './network_diagram';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import { ConfigValueOptions } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createNetworkDiagramTypeDefinition = (params: any = {}) => ({
  name: 'network_diagram',
  type: 'network_diagram',
  id: 'network_diagram',
  label: 'Network Diagram',
  fullLabel: 'network_diagram',
  iconType: 'visLine',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'value_options',
            name: 'Value options',
            editor: ConfigValueOptions,
            mapTo: 'valueOptions',
            schemas: [
              {
                name: 'Source',
                isSingleSelection: true,
                component: null,
                mapTo: 'source',
              },
              {
                name: 'Destination',
                isSingleSelection: true,
                component: null,
                mapTo: 'dest',
              },
            ],
          },
        ],
      },
      {
        id: 'style-panel',
        name: 'Layout',
        mapTo: 'layoutConfig',
        editor: ConfigEditor,
        content: [],
      },
    ],
  },
  visConfig: {
    layout: {
      ...sharedConfigs.layout,
      ...{
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        margin: { left: 60 },
      },
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: NetworkDiagram,
});
