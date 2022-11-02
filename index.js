const { HexString, AptosClient, AptosAccount, TxnBuilderTypes, BCS } = require('aptos');
const main = async () => {
    const hex_private_key = '661978647d9c209fc22164405f9a9882271dfbc355d53f6ead42f0a897e1141b';
    const private_key = Uint8Array.from(Buffer.from(hex_private_key, 'hex'));

    const sender = new AptosAccount(private_key)
    const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5::fanv4token",
            "init_fanv4",
            [],
            [
                // "0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5"
            ]
        ))

    const raw_tx = await client.generateRawTransaction(
        new HexString("0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5"),
        payload
    )

    const signed_tx = await client.signTransaction(
        sender,
        raw_tx
    )

    const response = await client.submitSignedBCSTransaction(signed_tx);

    console.log("Transaction response => ", response);

    await client.waitForTransactionWithResult(response.hash, {
        checkSuccess: true
    });
}


const mint = async () => {
    const hex_private_key = '661978647d9c209fc22164405f9a9882271dfbc355d53f6ead42f0a897e1141b';
    const private_key = Uint8Array.from(Buffer.from(hex_private_key, 'hex'));

    const sender = new AptosAccount(private_key)
    const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

    const token = new TxnBuilderTypes.TypeTagStruct(
        TxnBuilderTypes.StructTag.fromString("0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5::fanv4token::FANV4"),
    );

    const receiverAddress = TxnBuilderTypes.AccountAddress.fromHex(
        "0x76ce0582ebbb2e125ae78e02a21fd8db7bb079a7aadc5c7ea90dd3b597bf7c96",
    );
      
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5::fanv4token",
            "mint",
            [
                token
            ],
            [
                BCS.bcsToBytes(receiverAddress), 
                BCS.bcsSerializeUint64(10000000000000000)
            ]
        ))

    const raw_tx = await client.generateRawTransaction(
        new HexString("0xb3c2b1dd7f957da992c62e563fca0dc4eff32e9cad4cd8bf078dbcc37b4fd0f5"),
        payload
    )

    const signed_tx = await client.signTransaction(
        sender,
        raw_tx
    )

    const response = await client.submitSignedBCSTransaction(signed_tx);

    console.log("Transaction response => ", response);

    await client.waitForTransactionWithResult(response.hash, {
        checkSuccess: true
    });
}

mint();