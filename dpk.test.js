const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });
    it("Returns the literal '0' when given 'null' input", () => {
        const trivialKey = deterministicPartitionKey(null);
        expect(trivialKey).toBe("0");
    });
    it("Returns the partitionKey when it is passed", () => {
        const event = new Object();
        event.partitionKey = '1234567890';
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(event.partitionKey);
    });
    it("Returns the partitionKey when it is passed as not string", () => {
        const event = new Object();
        event.partitionKey = 123;
        const trivialKeyInt = deterministicPartitionKey(event);
        expect(trivialKeyInt).toBe(String(event.partitionKey));
    });
    it("Returns a hash value when partitionKey is not provided", () => {
        const event = '1234567890'
        candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(candidate);
    });
    it("Returns a hash of partitionKey when it is passed and has more chars than MAX_PARTITION_KEY_LENGTH", () => {
        const event = new Object();
        event.partitionKey = "x".repeat(555);
        candidate = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe(candidate);
    });
});