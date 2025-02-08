import {Vector2} from '@theatrejs/theatrejs';

/**
 * Creates LDTK module managers.
 *
 * @example
 *
 * const ldtk = new Ldtk(data);
 * ldtk.getEntities({$level, $layer});
 */
class Ldtk {

    /**
     * @typedef {Object} TypeEntity A transformed LDTK JSON entity.
     * @property {string} TypeEntity.$identifier The identifier.
     * @property {Vector2} TypeEntity.$position The position.
     * @property {string} TypeEntity.$type The type.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} TypeGrid A transformed LDTK JSON grid.
     * @property {Vector2} TypeGrid.$cell The size of each cell.
     * @property {Array<number>} TypeGrid.$data The flat data (one-dimensional).
     * @property {Map<number, string>} TypeGrid.$definitions The data definitions.
     * @property {number} TypeGrid.$height The number of cells on the y-axis.
     * @property {Vector2} TypeGrid.$position The position.
     * @property {number} TypeGrid.$width The number of cells on the x-axis.
     * @protected
     *
     * @memberof Ldtk
     */

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
     * Gets the entities from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the entities to get.
     * @param {string} $parameters.$level The level of the entities to get.
     * @returns {Array<TypeEntity>}
     * @public
     */
    getEntities({$layer, $level}) {

        const level = this.$data.levels
        .find(($current) => ($current.identifier === $level));

        if (typeof level === 'undefined') {

            return [];
        }

        const layer = level
        .layerInstances.find(($current) => ($current.__identifier === $layer));

        if (typeof layer === 'undefined') {

            return [];
        }

        return layer
        .entityInstances
        .map(($entity) => ({

            $identifier: $entity.iid,
            $type: $entity.__identifier,
            $position: new Vector2(

                $entity.px[0] - (level.pxWid / 2),
                - ($entity.px[1] - (level.pxHei / 2))
            )
        }));
    }

    /**
     * Gets the LDTK JSON data entities from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the entities to get.
     * @param {string} $parameters.$level The level of the entities to get.
     * @returns {Array<TypeLdtkEntity>}
     * @public
     */
    getEntitiesData({$layer, $level}) {

        const level = this.$data.levels
        .find(($current) => ($current.identifier === $level));

        if (typeof level === 'undefined') {

            return [];
        }

        const layer = level
        .layerInstances.find(($current) => ($current.__identifier === $layer));

        if (typeof layer === 'undefined') {

            return [];
        }

        return layer
        .entityInstances
        .map(($entity) => (window.structuredClone($entity)));
    }

    /**
     * Gets the grid from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the grid to get.
     * @param {string} $parameters.$level The level of the grid to get.
     * @returns {(TypeGrid | undefined)}
     * @public
     */
    getGrid({$layer, $level}) {

        const level = this.$data.levels
        .find(($current) => ($current.identifier === $level));

        if (typeof level === 'undefined') {

            return;
        }

        const layer = level
        .layerInstances.find(($current) => ($current.__identifier === $layer));

        if (typeof layer === 'undefined') {

            return;
        }

        const definition = this.$data.defs.layers
        .find(($current) => ($current.identifier === $layer));

        if (typeof definition === 'undefined') {

            return;
        }

        return {

            $data: [...layer.intGridCsv],
            $definitions: new Map(definition.intGridValues.map(($definition) => ([$definition.value, $definition.identifier]))),
            $cell: new Vector2(layer.__gridSize, layer.__gridSize),
            $width: layer.__cWid,
            $height: layer.__cHei,
            $position: new Vector2(level.pxWid / 2, level.pxHei / 2)
        };
    }

    /**
     * Gets the LDTK JSON data layer grid from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the grid to get.
     * @param {string} $parameters.$level The level of the grid to get.
     * @returns {TypeLdtkLayer}
     * @public
     */
    getGridData({$layer, $level}) {

        const level = this.$data.levels
        .find(($current) => ($current.identifier === $level));

        if (typeof level === 'undefined') {

            return;
        }

        const layer = level
        .layerInstances.find(($current) => ($current.__identifier === $layer));

        if (typeof layer === 'undefined') {

            return;
        }

        return window.structuredClone(layer);
    }
}

export {

    Ldtk
};

export default Ldtk;
