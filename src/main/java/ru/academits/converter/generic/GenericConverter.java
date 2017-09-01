package ru.academits.converter.generic;

import java.util.List;

/**
 * Created by Anna on 10.08.2017.
 */
public interface GenericConverter<S, D> {
    D convert(S source);

    List<D> convert(List<S> sourceList);
}

