/**
 * Creates LDTK entities.
 *
 * @example
 *
 * const entity = new LdtkEntity({$data, $identifier, $label});
 */
class LdtkEntity {

    /**
     * @typedef {Object} TypeLdtkEntityField A LDTK JSON data custom field.
     * @property {string} TypeLdtkEntityField.__identifier The identifier.
     * @property {string} TypeLdtkEntityField.__type The type.
     * @property {any} TypeLdtkEntityField.__value The value.
     * @protected
     *
     * @memberof LdtkEntity
     */

    /**
     * Stores the LDTK JSON data custom fields.
     * @type {Array<TypeLdtkEntityField>}
     * @private
     */
    $data;

    /**
     * Stores the identifier.
     * @type {string}
     * @private
     */
    $identifier;

    /**
     * Stores the label.
     * @type {string}
     * @private
     */
    $label;

    /**
     * Gets the LDTK JSON data custom fields.
     * @type {Array<TypeLdtkEntityField>}
     * @public
     */
    get data() {

        return this.$data;
    }

    /**
     * Gets the identifier.
     * @type {string}
     * @public
     */
    get identifier() {

        return this.$identifier;
    }

    /**
     * Gets the label.
     * @type {string}
     * @public
     */
    get label() {

        return this.$label;
    }

    /**
     * Creates a new LDTK entity.
     * @param {Object} $parameters The given parameters.
     * @param {Array<TypeLdtkEntityField>} $parameters.$data The LDTK JSON data custom fields.
     * @param {string} $parameters.$identifier The identifier of the entity to get.
     * @param {string} $parameters.$label The label of the entity to get.
     */
    constructor({$data, $identifier, $label}) {

        this.$data = $data;
        this.$identifier = $identifier;
        this.$label = $label;
    }
}

export {

    LdtkEntity
};

export default LdtkEntity;
