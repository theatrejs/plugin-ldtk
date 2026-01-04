import {Grid, Vector2} from '@theatrejs/theatrejs';

import {LdtkEntity} from './index.js';

/**
 * Creates LDTK module managers.
 *
 * @example
 *
 * const ldtk = new Ldtk(data);
 * ldtk.createGrid({$level, $layer});
 */
class Ldtk {

    /**
     * @typedef {Object} TypeLdtkDefinitionLayerGridValue A LDTK JSON data layer grid value definition.
     * @property {string} TypeLdtkDefinitionLayerGridValue.identifier The identifier.
     * @property {number} TypeLdtkDefinitionLayerGridValue.value The value.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkDefinitionLayer A LDTK JSON data layer definition.
     * @property {string} TypeLdtkDefinitionLayer.identifier The identifier.
     * @property {Array<TypeLdtkDefinitionLayerGridValue>} TypeLdtkDefinitionLayer.intGridValues The grid values.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkDefinitions A LDTK JSON data definition.
     * @property {Array<TypeLdtkDefinitionLayer>} TypeLdtkDefinitionLayer.layers The layers' definitions.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkEntityField A LDTK JSON data custom field.
     * @property {string} TypeLdtkEntityField.__identifier The identifier.
     * @property {string} TypeLdtkEntityField.__type The type.
     * @property {any} TypeLdtkEntityField.__value The value.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkEntity A LDTK JSON data entity.
     * @property {string} TypeLdtkEntity.__identifier The identifier.
     * @property {Array<number>} TypeLdtkEntity.__grid The grid-based coordinates.
     * @property {Array<TypeLdtkEntityField>} TypeLdtkEntity.fieldInstances The custom fields.
     * @property {string} TypeLdtkEntity.iid The iid.
     * @property {Array<number>} TypeLdtkEntity.px The position.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkLayer A LDTK JSON data layer.
     * @property {number} TypeLdtkLayer.__cHei The number of grid cells on the x-axis.
     * @property {number} TypeLdtkLayer.__cWid The number of grid cells on the y-axis.
     * @property {number} TypeLdtkLayer.__gridSize The size of each cell.
     * @property {string} TypeLdtkLayer.__identifier The identifier.
     * @property {Array<TypeLdtkEntity>} TypeLdtkLayer.entityInstances The entities.
     * @property {Array<number>} TypeLdtkLayer.intGridCsv The grid values.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtkLevel A LDTK JSON data level.
     * @property {string} TypeLdtkLevel.identifier The identifier.
     * @property {Array<TypeLdtkLayer>} TypeLdtkLevel.layerInstances The layers.
     * @property {number} TypeLdtkLevel.pxHei The height.
     * @property {number} TypeLdtkLevel.pxWid The width.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeLdtk A LDTK JSON data.
     * @property {TypeLdtkDefinitions} TypeLdtk.defs The definitions.
     * @property {Array<TypeLdtkLevel>} TypeLdtk.levels The delevs.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * Stores the LDTK JSON data.
     * @type {TypeLdtk}
     * @private
     */
    $data;

    /**
     * Gets the LDTK JSON data.
     * @type {TypeLdtk}
     * @public
     */
    get data() {

        return window.structuredClone(this.$data);
    }

    /**
     * Creates a new LDTK module manager.
     * @param {TypeLdtk} $data The LDTK JSON data.
     */
    constructor($data) {

        this.$data = window.structuredClone($data);
    }

    /**
     * Creates a grid of LDTK entities from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the entities to get.
     * @param {string} $parameters.$level The level of the entities to get.
     * @returns {Grid<LdtkEntity>}
     * @public
     */
    createGrid({$layer, $level}) {

        /**
         * @type {Grid<LdtkEntity>}
         */
        const grid = new Grid();

        const level = this.$data.levels
        .find(($current) => ($current.identifier === $level));

        if (typeof level === 'undefined') {

            return grid;
        }

        const layer = level
        .layerInstances.find(($current) => ($current.__identifier === $layer));

        if (typeof layer === 'undefined') {

            return grid;
        }

        layer.entityInstances.forEach(($entity) => {

            const [x, y] = $entity.__grid;

            const entity = new LdtkEntity({

                $data: window.structuredClone($entity.fieldInstances),
                $identifier: $entity.iid,
                $label: $entity.__identifier
            });

            grid.set(new Vector2(x, y), entity);
        });

        return grid;
    }
}

export {

    Ldtk
};

export default Ldtk;
