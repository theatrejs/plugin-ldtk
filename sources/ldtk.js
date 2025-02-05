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
     * @typedef {Object} typeentity A transformed LDTK JSON entity.
     * @property {string} typeentity.$identifier The identifier.
     * @property {Vector2} typeentity.$position The position.
     * @property {string} typeentity.$type The type.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typegrid A transformed LDTK JSON grid.
     * @property {Vector2} typegrid.$cell The size of each cell.
     * @property {Array<number>} typegrid.$data The flat data (one-dimensional).
     * @property {Map<number, string>} typegrid.$definitions The data definitions.
     * @property {number} typegrid.$height The number of cells on the y-axis.
     * @property {Vector2} typegrid.$position The position.
     * @property {number} typegrid.$width The number of cells on the x-axis.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtkdefinitionlayergridvalue A LDTK JSON data layer grid value definition.
     * @property {string} typeldtkdefinitionlayergridvalue.identifier The identifier.
     * @property {number} typeldtkdefinitionlayergridvalue.value The value.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtkdefinitionlayer A LDTK JSON data layer definition.
     * @property {string} typeldtkdefinitionlayer.identifier The identifier.
     * @property {Array<typeldtkdefinitionlayergridvalue>} typeldtkdefinitionlayer.intGridValues The grid values.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtkdefinitions A LDTK JSON data definition.
     * @property {Array<typeldtkdefinitionlayer>} typeldtkdefinitionlayer.layers The layers' definitions.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtkentityfield A LDTK JSON data custom field.
     * @property {string} typeldtkentityfield.__identifier The identifier.
     * @property {string} typeldtkentityfield.__type The type.
     * @property {any} typeldtkentityfield.__value The value.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtkentity A LDTK JSON data entity.
     * @property {string} typeldtkentity.__identifier The identifier.
     * @property {Array<typeldtkentityfield>} typeldtkentity.fieldInstances The custom fields.
     * @property {string} typeldtkentity.iid The iid.
     * @property {Array<number>} typeldtkentity.px The position.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtklayer A LDTK JSON data layer.
     * @property {number} typeldtklayer.__cHei The number of grid cells on the x-axis.
     * @property {number} typeldtklayer.__cWid The number of grid cells on the y-axis.
     * @property {number} typeldtklayer.__gridSize The size of each cell.
     * @property {string} typeldtklayer.__identifier The identifier.
     * @property {Array<typeldtkentity>} typeldtklayer.entityInstances The entities.
     * @property {Array<number>} typeldtklayer.intGridCsv The grid values.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtklevel A LDTK JSON data level.
     * @property {string} typeldtklevel.identifier The identifier.
     * @property {Array<typeldtklayer>} typeldtklevel.layerInstances The layers.
     * @property {number} typeldtklevel.pxHei The height.
     * @property {number} typeldtklevel.pxWid The width.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * @typedef {Object} typeldtk A LDTK JSON data.
     * @property {typeldtkdefinitions} typeldtk.defs The definitions.
     * @property {Array<typeldtklevel>} typeldtk.levels The delevs.
     * @protected
     *
     * @memberof Ldtk
     */

    /**
     * Stores the LDTK JSON data.
     * @type {typeldtk}
     * @private
     */
    $data;

    /**
     * Gets the LDTK JSON data.
     * @type {typeldtk}
     * @public
     */
    get data() {

        return window.structuredClone(this.$data);
    }

    /**
     * Creates a new LDTK module manager.
     * @param {typeldtk} $data The LDTK JSON data.
     */
    constructor($data) {

        this.$data = window.structuredClone($data);
    }

    /**
     * Gets the entities from the given level on the given layer.
     * @param {Object} $parameters The given parameters.
     * @param {string} $parameters.$layer The layer of the entities to get.
     * @param {string} $parameters.$level The level of the entities to get.
     * @returns {Array<typeentity>}
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
     * @returns {Array<typeldtkentity>}
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
     * @returns {(typegrid | undefined)}
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
     * @returns {typeldtklayer}
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
