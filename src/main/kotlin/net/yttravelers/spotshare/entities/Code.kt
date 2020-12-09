package net.yttravelers.spotshare.entities

import java.io.Serializable
import javax.persistence.*

@Embeddable
class CodeId: Serializable {
    lateinit var division: String
    lateinit var divKey: String
}

@Entity
@Table(name = "code")
class Code {
    @EmbeddedId
    lateinit var codeId: CodeId

    @Column(nullable = false)
    lateinit var divName: String

    @Column(nullable = false)
    lateinit var divKeyName: String

    @Column(nullable = false)
    var divValue: Int? = null
}